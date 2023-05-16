const express = require('express')
// Declarando a variável app com o método da importação do módulo express
const app = express()
// Declarando a porta de conexão
const port = 3000
// Rota inicial da API
app.get('/', (req, response) => {
    try{
        response.send({"express api running": "🥳️"})
    }
    catch(error){
        console.log('Ops! Houve um erro no servidor:\n', error)
    }
})

// Subindo o servidor da API na porta 3000
app.listen(port, () => {
    console.log(`API Rodando na porta ${port}`)
})
