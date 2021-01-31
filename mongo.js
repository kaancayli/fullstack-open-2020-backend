const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log(
        'Please provide the password as an argument: node mongo.js <password>'
    )
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kaan:${password}@cluster0.mvdwp.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)
if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person
        .save()
        .then((result) => {
            console.log(result)
            console.log(
                `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
            )
            mongoose.connection.close()
        })
        .catch((error) => {
            console.log(error)
            mongoose.connection.close()
        })
} else if (process.argv.length > 5) {
    console.log(
        'Too many arguements, please provide only a name and a number: node mongo.js <password> <name> <number>'
    )
    process.exit(1)
} else {
    if (process.argv.length === 3) {
        Person.find({})
            .then((persons) => {
                persons.forEach((person) => {
                    console.log(person)
                })
                mongoose.connection.close()
            })
            .catch((error) => {
                console.log(error)
                mongoose.connection.close()
            })
    } else {
        console.log(
            'Please provide a name and a number: node mongo.js <password> <name> <number>'
        )
        process.exit(1)
    }
}
