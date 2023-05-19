const express = require('express')
const Database = require('./database/database')

// Declarando a variável app com o método da importação do módulo express
const app = express()
// Declarando a porta de conexão
const port = 3000
// Middleware express.json() para analisar corpos de solicitação JSON
app.use(express.json())
// Rota inicial da API
app.get('/', (req, res) => {
    try{
        res.send({"express api running": "🥳️"})
        console.log('[NOVA REQUISIÇÃO]: /')
    }
    catch(err){
        console.log('Ops! Houve um erro no servidor:\n', err)
    }
})
// Rota de status da aplicação
app.get('/status', (req, res) => {
    try{
        res.send({
            "framework": "express",
            "server": "online",
            "status code": 200
        })
        console.log('[NOVA REQUISIÇÃO]: /status')
    }
    catch(err){
        console.log('Ops! Houve um erro ao enviar sua solicitação:\n', err)
    }

})
// Rota para registro de usuários
app.post('/api/register', async (req, res) => {
    try{
        const data = req.body; // Armazenando o JSON do Body na variável "data"
        const user = {
            "name": data['name'],
            "email": data['email'],
            "password": data['password'],
        }
        //  Chamando a classe do banco de dados e executando seu método de Registro para usuários
        const db = new Database()
        const response = await db.registro(user)
        res.send(response)
        // Logs
        console.log('[NOVA REQUISIÇÃO - USER REGISTER]: /api/register; [BODY]:')
        console.log(data, '\n')
    }
    catch(err){
        console.log('Ops! Houve um erro ao enviar sua solicitação:\n', err)
    }
})

// Subindo o servidor da API na porta 3000
app.listen(port, () => {
    console.log(`\nAPI Rodando em 'http://127.0.0.1:${port}' 🚀\n`)
})
