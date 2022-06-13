const express = require('express')
const { products } = require('./data')

const app = express()

app.get('/', (req, res) => {
    // res.json([
    //     {
    //         name: 'andres'
    //     }, {
    //         name: 'susan'
    //     }
    // ])
    res.json(products)
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000...')
    console.log('http://localhost:5000')
})