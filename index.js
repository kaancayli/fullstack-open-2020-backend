require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/Person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(
    morgan(':method :url :status :req[content-length] - :response-time ms :body')
)

// eslint-disable-next-line no-unused-vars
morgan.token('body', function (req, res) {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
    return ''
})

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then((persons) => response.json(persons))
        .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            console.log(person)
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    Person.findByIdAndUpdate(request.params.id, body, { new: true })
        .then((person) => {
            console.log(person)
            response.json(person)
        })
        .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then((persons) => {
            console.log(persons)
            response.status(204).end()
        })
        .catch((error) => next(error))
})

// const generateId = () => {
//   let random = Math.floor(Math.random() * 10000);
//   while (persons.some((p) => p.id === random)) {
//     random = Math.floor(Math.random() * 10000);
//   }
//   return random;
// };

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    const person = new Person({
        ...body,
    })
    person
        .save()
        .then((person) => {
            console.log(person)
            response.json(person)
        })
        .catch((error) => next(error))
})

app.get('/info', (request, response) => {
    Person.count({}).then((count) => {
        console.log(count)
        response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${Date()}<p>
      `)
    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

const HOST = '0.0.0.0'
const PORT = process.env.PORT || 3001
app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`)
})
