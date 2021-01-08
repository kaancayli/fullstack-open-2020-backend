const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan(':method :url :status :req[content-length] - :response-time ms :body'));

morgan.token('body', function (req, res) { 
        if(req.method === 'POST') {
            return JSON.stringify(req.body);
        }
        return "";
})
  

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

    if(body.name === "" || body.name === undefined 
    || body.number === "" || body === undefined) {
        response.status(400).json({error: 'Name or number missing in the request body'}).end();
    }else if (persons.some(p => body.name === p.name)){
        response.status(400).json({error: 'Name must be unique'}).end();
    } else{
        const person = {
            id: generateId(),
            ... body,
        }
        console.log(person);
        persons = persons.concat(person);
        response.json(persons);
    }

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