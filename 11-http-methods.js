const express = require('express')

const { people } = require('./data')

const app =express()

app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({
    extended: false
}))
// parse json
app.use(express.json())

app.get('/api/people', (req, res) => {
    res.status(200).json({
        success: true,
        data: people
    })
})

app.post('/api/people', (req, res) => {
    const {name} = req.body

    if(!name){
        return res.status(400).json({
            success:false,
            msg: 'Please provide name value'
        })
    }
    return res.status(201).json({
        success: true,
        person: name
    })
})

app.post('/api/postman/people', (req, res) => {
    const {name} = req.body
    
    if(!name){
        return res.status(400).json({
            success:false,
            msg: 'Please provide name value'
        })
    }
    
    return res.status(201).json({
        success: true,
        person: [...people, {name}]
    })

})

app.post('/login', (req, res) => {
    // console.log(req.body);
    const {name} = req.body
    if(name){
        return res.status(200).send(`Welcome ${name}`)
    }

    return res.status(401).send('Please provide credentials')
})

app.put('/api/people/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body
    
    const newPerson = people.find(person => person.id === Number(id))

    if(!newPerson){
        return res.status(404).json({
            success: false,
            msg: `no person with id ${id}`
        })
    }

    const newPeople = people.map(person => {
        if(person.id === Number(id)){
            person.name = name
        }
        return person
    })

    return res.status(200).json({
        success: true,
        data: newPeople
    })
})

app.delete('/api/people/:id', (req, res) => {
    const { id } = req.params

    if (!people.find(person => person.id === Number(id))){
        return res.status(400).json({
            success: false,
            msg: `no person with id ${id}`
        })
    }

    const newPeople = people.filter(person => person.id !== Number(id))

    return res.status(200).json({
        success: true,
        msg: `person with id ${id} deleted successfully`,
        data: newPeople
    })

})


app.listen(5000, () => {
    console.log('Server listening in port 5000...');
})