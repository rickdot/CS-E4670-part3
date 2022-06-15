const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

morgan.token('body', request => {
    return JSON.stringify(request.body)
  })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    // range 0-9999
    let newID = Math.floor(Math.random() * 10000)
    idarr = persons.map(n => n.id)
    while (idarr.includes(newID)){
      newID = Math.floor(Math.random() * 10000)
    }
    return newID
}



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// 3.3
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    response.json(person)
})

// 3.4
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

// 3.2
app.get('/info', (request, response) => {
    const size = persons.length
    const timeDate = new Date()
    response.send(
        `<p>Phonebook has info for ${size} people</p>
        <p>${timeDate}</p>
        `
        
    )
})


// 3.5
app.post('/api/persons', (request, response) => {
    const body = request.body
    // console.log(body);

    // 3.6
    if (!body.name) {
    return response.status(400).json({ 
        error: 'name missing' 
    })
    }

    if (!body.number) {
    return response.status(400).json({ 
        error: 'number missing' 
    })
    }

    namearr = persons.map(n => n.name)
    if (namearr.includes(body.name)){
    return response.status(400).json({
        error: 'name must be unique'
    })
    }
    
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,      
    }
    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})