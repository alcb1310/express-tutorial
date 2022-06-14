const express = require('express')
const morgan = require('morgan')
const logger = require('./logger')
const authorize = require('./authorize')
const app =express()


// req => middleware => res
// app.use orders matters
// middleware functions first
app.use([morgan('tiny'), logger, authorize])

app.get('/', (req, res) => {
    console.log(req.user);
    res.send('Home')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/api/products', (req, res) => {
    res.send('Products')
})

app.get('/api/items', (req, res) => {
    res.send('Items')
})

app.listen(5000, () => {
    console.log('Server listening in port 5000...');
})