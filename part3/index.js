const express = require('express');

const app = express();

app.use(express.json());

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
];

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    console.log(person)
    if(person) {
        response.json(person);
    }else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(p => p.id !== id);
    console.log(persons)
    response.status(204).end()
})

const generateId = () => {
    let random = Math.floor(Math.random() * 10000);
    while(persons.some(p => p.id === random)) {
        random = Math.floor(Math.random() * 10000);
    }
    return random
};

app.post('/api/persons', (request, response) => {
    body = request.body;

    const person = {
        id: generateId(),
        name : body.name,
        number: body.number,
    }
    console.log(person);
    persons.concat(person);
    response.json(person);
})

app.get('/info', (request, response) => {
    response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}<p>
    `);
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})