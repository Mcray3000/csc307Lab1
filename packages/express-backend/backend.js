// backend.js
import express from "express";
import cors from "cors";

// db time, oh yeah
import userServices from "./models/user-services.js";


// TODO
//   addUser,
//   getUsers,
//   findUserById,
//   findUserByName,
//   findUserByJob,

const app = express();
const port = 8000;

// use cors of course
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello McCay!");
});

// GET USER BY NAME AND JOB

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  userServices
    .getUsers(name, job)
    .then((result) => {
      if (result) res.status(200).send(result);
      else res.status(404).send(`Not Found`);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; // or req.params.id
  userServices
    .findUserById(id)
    .then((result) => {
      if (result) res.status(200).send(result);
      else res.status(404).send(`Not Found: ${id}`);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

// Why async??
app.post("/users", async (req, res) => {
  const userToAdd = req.body;

  userServices
    .addUser(userToAdd)
    .then((result) => res.status(201).send(result));
});

app.delete("/users/:id", (req, res) => {
  const userToRemove = req.params.id;
  let isSucess;
  isSucess = deleteUser(userToRemove);
  if (isSucess) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

const deleteUser = (id) => {
  if (users["users_list"].some((user) => user.id === id)) {
    users["users_list"] = users["users_list"].filter((user) => user.id !== id);
    return true;
  } else {
    return false;
  }
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" },
  ],
};
