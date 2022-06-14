function authorize(req, res, next){
    const { user } = req.query

    if(user === 'andres'){
        req.user = {
            name: 'andres',
            id: 3
        }
        next()
        return
    }
    res.status(401).send('Unauthorized')
}

module.exports = authorize