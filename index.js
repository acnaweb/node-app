const express = require('express')

const app = express()

app.get('/', (req, res)=>{
    res.send('OK')
})

app.listen(8080, ()=>{
    console.log('Serviço na porta 8080')
})
