const { pool } = require('../config')
const Usuario = require('../entidade/usuario')

const autenticaUsuarioDB = async (body) => {
    try {           
        const { email, senha } = body
        const results = await pool.query(`SELECT * FROM usuarios WHERE email = $1 AND senha = $2`,
        [email, senha]);
        
        if (results.rowCount == 0) {
            throw "Usuário ou tenha inválidos";
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.telefone, usuario.nome, usuario.senha, usuario.tipo, usuario.id);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }    
}

const addUsuarioDB = async (body) => {
    try {   
        const { email, nome, telefone, senha, tipo } = body; 
        const results = await pool.query(`INSERT INTO usuarios (email, nome, telefone, senha, tipo) 
            VALUES ($1, $2, $3, $4, $5)
            returning id, nome, email, telefone, senha, tipo`,
        [email, nome, telefone, senha, tipo]);
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.telefone, usuario.nome, usuario.senha, usuario.tipo, usuario.id);
    } catch (err) {
        throw "Erro ao cadastrar o usuário: " + err;
    }    
}

const updateUsuarioDB = async (body) => {
    try {   
        const { id, email, nome, tipo, senha, telefone }  = body; 
        const results = await pool.query(`UPDATE usuario SET email = $2, nome = $3 , tipo = $4, telefone = $5 WHERE id = $1 
        returning id, email, nome, tipo, senha, telefone`,
        [id, email, nome, tipo, senha, telefone]);        
        if (results.rowCount == 0){
            throw `Nenhum usuário encontrado com o ID ${id} para ser alterado`;
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.telefone, usuario.nome, usuario.senha, usuario.tipo, usuario.id);
    } catch (err) {
        throw "Erro ao alterar o usuário: " + err;
    }      
}

const getUsuarioByIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM usuarios WHERE id = $1`, [id]);
        if (results.rowCount === 0) {
            throw "Usuário não encontrado";
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.telefone, usuario.nome, usuario.senha, usuario.tipo, usuario.id);
    } catch (err) {
        throw "Erro ao buscar usuário: " + err;
    }
};
module.exports = {
    autenticaUsuarioDB, addUsuarioDB, updateUsuarioDB, getUsuarioByIdDB
}