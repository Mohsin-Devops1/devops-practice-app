// A tiny in-memory "database". Data resets whenever the app restarts.
// (Great practice later: replace this with PostgreSQL in docker-compose!)

let todos = [];
let nextId = 1;

function list() {
  return todos;
}

function add(title) {
  const todo = { id: nextId++, title: title.trim(), done: false };
  todos.push(todo);
  return todo;
}

function toggle(id) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;
  todo.done = !todo.done;
  return todo;
}

function remove(id) {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
}

function reset() {
  todos = [];
  nextId = 1;
}

module.exports = { list, add, toggle, remove, reset };
