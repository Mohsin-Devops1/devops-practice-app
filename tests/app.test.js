const request = require("supertest");
const app = require("../src/app");
const store = require("../src/todoStore");

beforeEach(() => store.reset());

describe("health and info", () => {
  test("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  test("GET /api/info returns app details", async () => {
    const res = await request(app).get("/api/info");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("devops-practice-app");
    expect(res.body).toHaveProperty("version");
  });
});

describe("todos API", () => {
  test("starts with an empty list", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.body).toEqual([]);
  });

  test("creates a todo", async () => {
    const res = await request(app).post("/api/todos").send({ title: "Learn CI/CD" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ id: 1, title: "Learn CI/CD", done: false });
  });

  test("rejects an empty title", async () => {
    const res = await request(app).post("/api/todos").send({ title: "   " });
    expect(res.statusCode).toBe(400);
  });

  test("rejects malformed JSON", async () => {
    const res = await request(app)
      .post("/api/todos")
      .set("Content-Type", "application/json")
      .send("{bad json");
    expect(res.statusCode).toBe(400);
  });

  test("toggles a todo", async () => {
    await request(app).post("/api/todos").send({ title: "Write tests" });
    const res = await request(app).patch("/api/todos/1/toggle");
    expect(res.body.done).toBe(true);
  });

  test("toggle returns 404 for unknown id", async () => {
    const res = await request(app).patch("/api/todos/999/toggle");
    expect(res.statusCode).toBe(404);
  });

  test("deletes a todo", async () => {
    await request(app).post("/api/todos").send({ title: "Delete me" });
    const del = await request(app).delete("/api/todos/1");
    expect(del.statusCode).toBe(204);
    const list = await request(app).get("/api/todos");
    expect(list.body).toHaveLength(0);
  });

  test("delete returns 404 for unknown id", async () => {
    const res = await request(app).delete("/api/todos/42");
    expect(res.statusCode).toBe(404);
  });
});

describe("unknown routes", () => {
  test("returns 404 JSON", async () => {
    const res = await request(app).get("/nope");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("route not found");
  });
});
