# DevOps Practice App

A small to-do web app (Node.js + Express). It already runs, has tests and a linter.
Everything else (Git, CI/CD, Docker, deployment) is for you to build.

## Run it

```bash
npm install
npm start          # open http://localhost:3000
```

Stop with `Ctrl + C`.

## Commands the app already supports

| Command | What it does |
|---------|--------------|
| `npm install` | Install dependencies (use `npm ci` in pipelines) |
| `npm start` | Start the app on port 3000 (change with `PORT=4000`) |
| `npm run dev` | Start with auto-restart on file changes |
| `npm run lint` | Check code for style problems and mistakes |
| `npm test` | Run the automated tests and coverage report |

## Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/` | The web page |
| GET | `/health` | Health check, returns `{"status":"ok"}` |
| GET | `/api/info` | Version, environment, hostname, git commit |
| GET | `/api/todos` | List tasks |
| POST | `/api/todos` | Create a task: `{"title": "..."}` |
| PATCH | `/api/todos/:id/toggle` | Mark done or not done |
| DELETE | `/api/todos/:id` | Delete a task |

Tasks are stored in memory, so they reset when the app restarts.

## Folder structure

```
src/app.js          routes
src/server.js       starts the server
src/todoStore.js    in-memory data
public/index.html   web page
tests/app.test.js   automated tests
eslint.config.js    linter rules
package.json        dependencies and scripts
```

## Your DevOps roadmap (build these yourself, in order)

1. [ ] Git: `git init`, first commit, push to a new GitHub repo
2. [ ] Branching: work on feature branches, open Pull Requests
3. [ ] CI: a GitHub Actions workflow that runs `npm ci`, `npm run lint`, `npm test`
4. [ ] Make CI fail on purpose (break a test, break lint) and read the logs
5. [ ] Branch protection: require CI to pass before merging into `main`
6. [ ] Docker: write a `Dockerfile` and `.dockerignore`, run the app in a container
7. [ ] Docker Compose: run the container with one command
8. [ ] Add a Docker build step to CI
9. [ ] CD: build and push the image to a registry (GHCR or Docker Hub) on merge to `main`
10. [ ] Server: create a Linux VM, install Docker, set up SSH access
11. [ ] Deploy: pipeline SSHes into the server, pulls the new image, restarts the container
12. [ ] Smoke test: after deploy, the pipeline checks `/health`
13. [ ] Rollback: redeploy a previous image tag
14. [ ] Extras: Jenkins, Trivy scan, Dependabot, Terraform, Ansible, Kubernetes, monitoring
