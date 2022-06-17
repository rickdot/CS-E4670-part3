const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]


const url = `mongodb+srv://rickz:${password}@cluster0.f3rfd.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// add
if(newName !== undefined) {
  mongoose
    .connect(url)
    .then(() => {
      const person = new Person({
        name: newName,
        number: newNumber
      })
      return person.save()
    })
    .then(() => {
      console.log(`added ${newName} number ${newNumber} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
  return
}

// get all
mongoose.connect(url)
Person
  .find({})
  .then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  }
  )
