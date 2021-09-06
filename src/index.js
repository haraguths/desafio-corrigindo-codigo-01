const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryDelete = repositories.find(repository => repository.id === id);

  if (!repositoryDelete) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositories.indexOf(repositoryDelete), 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const respositorie = repositories.find(repository => repository.id === id);

  if (!respositorie) {
    return response.status(404).json({ error: "Repository not found" });
  }

  respositorie.likes = respositorie.likes + 1

  return response.json(respositorie);
});

module.exports = app;
