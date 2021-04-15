const e = require('cors')
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.lvkji.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then( persons => {
        persons.forEach( person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
        process.exit(1)
    })
} else if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = String(process.argv[4])

    const contact = new Person ({
        name: name,
        number: number
    })

    contact.save().then( result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}