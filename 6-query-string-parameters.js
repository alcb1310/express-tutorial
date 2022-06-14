const express = require('express')
const { products } = require('./data')

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><p><a href="/api/products">products</a></p>')
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map(product => {
        const { id, name, image }= product
        return {id, name, image}
    })
    res.json(newProducts)
})

app.get('/api/products/:productID', (req, res) => {
    const {productID} = req.params
    const singleProduct = products.find(product => product.id === Number(productID))
    
    if(!singleProduct){
        return res.status(404).send('Product does not exist')
    }
    
    res.json(singleProduct)
})

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params)
    res.send('hello world')
})

app.get('/api/v1/query', (req, res) => {
    // console.log(req.query)
    const {search, limit} = req.query
    let sortedProduct = [...products]

    if(search){
        sortedProduct = sortedProduct.filter(product => {
            return product.name.startsWith(search)
        })
    }

    if(limit){
        sortedProduct = sortedProduct.slice(0, Number(limit))
    }

    // if(sortedProduct.length < 1){ 
        // return res.status(200).json({success: true, data: []})
    // }
    return res.status(200).json({success: true, data: sortedProduct})

    // res.status(200).json(sortedProduct)
    // res.send('hello world')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000...')
    console.log('http://localhost:5000')
})