const express = require('express')

const app = express()
const client = redis.createClient()

app.get('/', (req, res)=>{
    res.send('OK')
})

app.listen(8081, ()=>{
    console.log('Serviço na porta 8081')
})
