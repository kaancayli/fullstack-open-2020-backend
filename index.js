require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/Person");

app.use(express.json());
app.use(express.static("build"));
app.use(cors());
app.use(
  morgan(":method :url :status :req[content-length] - :response-time ms :body")
);

morgan.token("body", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

app.get("/api/persons", (request, response, next) => {
  Person.find({}).then((persons) => response.json(persons)).catch(error => next(error));
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    console.log(person);
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  }).catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then((persons) => {
    console.log(persons);
    response.status(204).end();
  }).catch(error => next(error));
});

// const generateId = () => {
//   let random = Math.floor(Math.random() * 10000);
//   while (persons.some((p) => p.id === random)) {
//     random = Math.floor(Math.random() * 10000);
//   }
//   return random;
// };

app.post("/api/persons", (request, response, next) => {
  body = request.body;

  if (
    body.name === "" ||
    body.name === undefined ||
    body.number === "" ||
    body === undefined
  ) {
    response
      .status(400)
      .json({ error: "Name or number missing in the request body" })
      .end();
  } else {
    Person.findOneAndUpdate({name: body.name}, {number: body.number}, {
      new: true,
      upsert: true,
    }).then(person => {
      console.log(person);
      response.json(person);
    }).catch(error => next(error));
  }
});

app.get("/info", (request, response) => {
  Person.count({}).then(count => {
    console.log(count);
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${Date()}<p>
      `);
  })
});

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 3001;
app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
});
