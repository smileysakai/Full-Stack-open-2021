const express = require('express')
const app = express()
const morgan = require('morgan')


app.use(express.json())

const cors = require('cors')

app.use(cors())

app.use(express.static('build'))

//app.use(morgan('tiny'))

morgan.token('value', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :value'))

require('dotenv').config()
const Person = require('./models/people')

let persons = [  
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Ada Lovelaces",
        "number": "5354432555324",
        "id": 4
    },
    {
        "name": "Crying Horse",
        "number": "53253253",
        "id": 5
    },
    {
        "name": "Laughing Clown",
        "number": "542345235",
        "id": 6
    },
    {
        "name": "Jebaited",
        "number": "000",
        "id": 7
    }     
]
    
app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/info', (request, response) => {
    const personL = persons.length
    const date = new Date()
    response.send(`Phonebook has info for ${personL} people <br/><br/> ${date}`)
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
    /*const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
    */
   Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

/*
const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(person => person.id))
      : 0
    return maxId + 1
  }
  */

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
      number: body.number,
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ 
        error: 'name or number missing' 
        })
    }
/*
    if (persons.find(person => person.name === body.name)){
        return response.status(400).json({ 
            error: `name must be unique` 
        })
    }
    */
   Person.find().byName(body.name).exec((err, people) => {
        const [personquery] = people
        if (personquery === undefined){
            const person = new Person({
                name: body.name,
                number: body.number,
            })

            person.save().then(savedPerson => {
                response.json(savedPerson)
            }) 
        }
    })
})



const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  // this has to be the last loaded middleware.
  app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})