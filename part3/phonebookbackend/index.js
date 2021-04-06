const express = require('express')
const app = express()

app.use(express.json())

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
    response.json(persons)
})

app.get('/info', (request, response) => {
    const personL = persons.length
    const date = new Date()
    response.send(`Phonebook has info for ${personL} people <br/><br/> ${date}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id===id)
    if (person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(person => person.id))
      : 0
    return maxId + 1
  }
  
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
        error: 'name or number missing' 
        })
    }

    if (persons.find(person => person.name === body.name)){
        return response.status(400).json({ 
            error: `name must be unique` 
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(persons)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})