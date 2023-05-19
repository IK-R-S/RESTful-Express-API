const Pool = require('pg').Pool
const crypto = require('crypto');
const server  = require('./server')
const pool =  new Pool(server)

class Database {
    async registro(user){
        // Verificando se o usuário já não existe no banco de dados, caso contrário criando o usuário novo
        const database_response = await pool.query("SELECT id, name, email, password FROM users WHERE email = $1", [user.email]);
        const account = database_response.rows
        if (account.length > 0) {
            return {"info": "este usuário já existe","email": account[0].email };
        }
        else {
            // Criando Hash para criptografar a senha antes de armazenar no banco de dados
            const _hashed_password = crypto.createHash('sha256').update(user.password).digest('hex');
            // Adicionando de o novo usuário
            const newUser = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [user.name, user.email, _hashed_password]);
            // Retorno da API
            return {"novo usuario cadastrado": user}
        }

    }
}


module.exports = Database;