const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)



mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number:{
    type: String,
    minlength: 8,
    validate: {
      validator: function(str) {
        const parts = str.split('-')
        // console.log(parts);
        return (parts.length === 1 || (parts.length===2 && (parts[0].length===2 || parts[0].length===3)))
      },
      message: 'Wrong phone number format.'
    },
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)