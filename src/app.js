const express = require("express");
const path = require("path");
const os = require("os");
const { version } = require("../package.json");
const store = require("./todoStore");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Health check: used by Docker, load balancers and your CD smoke test.
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: Math.round(process.uptime()) });
});

// Shows which version/container is answering. Handy to verify a deployment.
app.get("/api/info", (req, res) => {
  res.json({
    name: "devops-practice-app",
    version,
    environment: process.env.NODE_ENV || "development",
    hostname: os.hostname(),
    commit: process.env.GIT_COMMIT || "unknown",
  });
});

app.get("/api/todos", (req, res) => {
  res.json(store.list());
});

app.post("/api/todos", (req, res) => {
  const { title } = req.body || {};
  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }
  res.status(201).json(store.add(title));
});

app.patch("/api/todos/:id/toggle", (req, res) => {
  const todo = store.toggle(Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "todo not found" });
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const removed = store.remove(Number(req.params.id));
  if (!removed) return res.status(404).json({ error: "todo not found" });
  res.status(204).send();
});

// Unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "route not found" });
});

// Error handler (e.g. malformed JSON body)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
