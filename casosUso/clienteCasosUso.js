const { pool } = require('../config');
const Cliente = require('../entidade/cliente')

const getClientesDB = async () => {
    try {    
        const { rows } = await pool.query(`SELECT c.id, c.nome, c.cpf_cnpj, c.telefone, c.endereco FROM cliente c ORDER BY c.nome`);
        return rows.map((cliente) => new Cliente(cliente.id, cliente.nome, cliente.cpf_cnpj, cliente.telefone, cliente.endereco));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addClienteDB = async (body) => {
    try {   
        const { nome, cpf_cnpj, telefone, endereco } = body; 
        const results = await pool.query(`INSERT INTO cliente (nome, cpf_cnpj, telefone, endereco) 
            VALUES ($1, $2, $3, $4)
            returning id, nome, cpf_cnpj, telefone, endereco`,
        [nome, cpf_cnpj, telefone, endereco]);
        const cliente = results.rows[0];
        return new Cliente(cliente.id, cliente.nome, cliente.cpf_cnpj, cliente.telefone, cliente.endereco);
    } catch (err) {
        throw "Erro ao cadastrar o cliente: " + err;
    }    
}

const updateClienteDB = async (body) => {
    try {   
        const { id, nome, cpf_cnpj, telefone, endereco }  = body; 
        const results = await pool.query(`UPDATE cliente SET nome = $2, cpf_cnpj = $3, telefone = $4, endereco = $5 WHERE id = $1 
        returning id, nome, cpf_cnpj, telefone, endereco`,
        [id, nome, cpf_cnpj, telefone, endereco]);        
        if (results.rowCount == 0){
            throw `Nenhum registro de cliente encontrado com o código ${id} para ser alterado`;
        }
        const cliente = results.rows[0];
        return new Cliente(cliente.id, cliente.nome, cliente.cpf_cnpj, cliente.telefone, cliente.endereco);
    } catch (err) {
        throw "Erro ao alterar o cliente: " + err;
    }      
}

const deleteClienteDB = async (id) => {
    try {           
        const results = await pool.query(`DELETE FROM cliente where id = $1`,[id]);
        if (results.rowCount == 0){
            throw `Nenhum registro de cliente encontrado com o código ${id} para ser removido`;
        } else {
            return "Cliente removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o cliente: " + err;
    }     
}

const getClientePorIdDB = async (id) => {
    try {           
        const results = await pool.query(`SELECT c.id, c.nome, c.cpf_cnpj, c.telefone, c.endereco FROM cliente c WHERE c.id = $1`, [id]);
        if (results.rowCount == 0){
            throw "Nenhum registro de cliente encontrado com o código: " + id;
        } else {
            const cliente = results.rows[0];
            return new Cliente();
        }       
    } catch (err) {
        throw "Erro ao recuperar o cliente: " + err;
    }     
}

module.exports = {
    getClientesDB, getClientePorIdDB, addClienteDB, deleteClienteDB, updateClienteDB
}