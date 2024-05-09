const express = require('express')

const app = express()

app.get('/', (req, res)=>{
    res.send('app is running')
})

app.listen(8080, ()=>{
    console.log('Serviço na porta 8080')
})
