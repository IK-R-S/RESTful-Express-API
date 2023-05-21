const express = require('express')
const Database = require('./database/database')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
// Declarando a variável app com o método da importação do módulo express
const app = express()
// Declarando a porta de conexão
const port = 3000
// Middleware express.json() para analisar corpos de solicitação JSON
app.use(express.json())
// Middleware cookie-parser para analisar cookies
app.use(cookieParser());

// Rota inicial da API
app.get('/', (req, res) => {
    try{
        res.send({"express api running": "🥳️"})
        console.log('[NOVA REQUISIÇÃO]: /')
    }
    catch(err){
        console.log('Ops! Houve um erro no servidor:\n', err)
        res.status(500).send({"info": "Internal server error", "status code": 500})
    }
})
// Rota de status da aplicação
app.get('/status', (req, res) => {
    try{
        res.status(200).send({
            "framework": "express",
            "server": "online",
            "status code": 200
        })
        console.log('[NOVA REQUISIÇÃO]: /status')
    }
    catch(err){
        console.log('Ops! Houve um erro ao enviar sua solicitação:\n', err)
        res.status(500).send({
            "framework": "express",
            "server": "offline - Internal server error",
            "status code": 500
        })
    }

})
// Rota para registro de usuários
app.post('/api/register', async (req, res) => {
    try{
        const data = req.body; // Armazenando o JSON do Body na variável "data" e depois inserindo no objeto "user"
        const user = {
            "name": data['name'],
            "email": data['email'],
            "password": data['password'],
        }
        // Chamando a classe do banco de dados e executando seu método de Registro para usuários
        const db = new Database()
        const response = await db.registro(user)
        res.status(response.status).send(response) // Response da API
        // Logs
        console.log('[NOVA REQUISIÇÃO - USER REGISTER]: /api/register; [BODY]:')
        console.log(data, '\n')
    }
    catch(err){
        console.log('Ops! Houve um erro ao enviar sua solicitação:\n', err)
        res.status(500).send({"info": "Internal server error", "status code": 500})
    }
})
// Rota para login
app.post('/api/login', async (req, res) => {
    try{
        const data = req.body;
        const user = {
            "email": data['email'],
            "password": data['password'],
        }
        // Chamando a classe do banco de dados e executando seu método de "login"
        const db = new Database()
        const response = await db.login(user)
        res.cookie('sessionToken', response.token, { httpOnly: true });
        res.status(response.status).send(response)
        // Logs
        console.log('[NOVA REQUISIÇÃO - USER LOGIN]: /api/login; [BODY]:')
        console.log(data, '\n')

    }
    catch(err){
        console.log('Ops! Houve um erro ao enviar sua solicitação:\n', err)
        res.status(500).send({"info": "Internal server error", "status code": 500})
    }
})
// Rota de Dashboard para usuários logados
app.get('/api/dashboard', async (req, res) => {
    try {
        // Definindo o Token de sessão a partir do cookie atual (se tiver)
        const sessionToken = req.cookies.sessionToken;

        if (sessionToken) { // Caso exista um Cookie
            // Decodificando o email do usuário que possui a sessão existente
            const decodedUserSession = jwt.verify(sessionToken, 'chave_secreta_do_jwt');
            userEmail = decodedUserSession.email
            // Retornando as informações do usuário pela classe Database e método "dashboard"
            const db = new Database()
            const response = await db.dashboard(userEmail)
            res.status(response.status).send({"info": "acesso permitido", response})
        } 
        else { // Se não
            // O cookie 'sessionToken' não está presente na sessão atual
            res.status(401).send({"info": "acesso negado", "code": 401});
        }
    } catch (err) {
        console.log('Ops! Houve um erro ao enviar sua solicitação:\n', err);
        res.status(500).send({"info": "Internal server error", "status code": 500})
    }
 
});
// Rota para o usuário criar novos itens no banco de dados
app.post('/api/create-item', async (req, res) => {
    try{
        const sessionToken = req.cookies.sessionToken;
        if (sessionToken){
            const decodedUserSession = jwt.verify(sessionToken, 'chave_secreta_do_jwt');
            userId = decodedUserSession
            // Enviando os dados do body dentro do objeto "item"
            console.log('teste ', userId)
            const data = req.body;
            const item = {
                "name": data['name'],
                "description": data['description'],
                "userId": userId
            }
            // Retornando a mensagem de que o item foi criado pelo usuário a partir da classe Database e método "createItem"
            const db = new Database()
            const response = await db.createItem(item)
            res.status(response.status).send(response)
        }
        else{
            res.status(401).send({"info": "acesso negado", "code": 401})
        }
    }
    catch(err){
        console.log('Ops! Houve um erro ao enviar sua solicitação:\n', err);
        res.status(500).send({"info": "Internal server error", "status code": 500})
    }
})
// Rota para obter informações dos itens
app.get('/api/item/:item', async (req, res) => {
    try{
        const itemName = req.params.item
        // Retornando as informações do item a partir da classe Database e método "item"
        const db = new Database()
        const response = await db.item(itemName)
        res.status(response.status).send(response)

    }
    catch(err){
        console.log('Ops! Houve um erro ao enviar sua solicitação:\n', err);
        res.status(500).send({"info": "Internal server error", "status code": 500})
    }
})
// Subindo o servidor da API na porta 3000
app.listen(port, () => {
    console.log(`\nAPI Rodando em 'http://127.0.0.1:${port}' 🚀\n`)
})
