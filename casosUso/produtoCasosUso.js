const { pool } = require('../config');
const Produto = require('../entidade/produto')

const getProdutosDB = async () => {
    try {    
        const { rows } = await pool.query(`SELECT p.id, p.nome, p.tipo, p.estoque, p.preco FROM produto p ORDER BY p.nome`);
        return rows.map((produto) => new Produto(produto.id, produto.nome, produto.tipo, produto.estoque, produto.preco));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addProdutoDB = async (body) => {
    try {   
        const { nome, tipo, estoque, preco } = body; 
        const results = await pool.query(`INSERT INTO produto (nome, tipo, estoque, preco) 
            VALUES ($1, $2, $3, $4)
            returning id, nome, tipo, estoque, preco`,
        [nome, tipo, estoque, preco]);
        const produto = results.rows[0];
        return new Produto(produto.id, produto.nome, produto.tipo, produto.estoque, produto.preco);
    } catch (err) {
        throw "Erro ao cadastrar o produto: " + err;
    }    
}

const updateProdutoDB = async (body) => {
    try {   
        const { id, nome, tipo, estoque, preco }  = body; 
        const results = await pool.query(`UPDATE produto SET nome = $2 , tipo = $3, estoque = $4, preco = $5 WHERE id = $1 
        returning id, nome, tipo, estoque, preco`,
        [id, nome, tipo, estoque, preco]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser alterado`;
        }
        const produto = results.rows[0];
        return new Produto(produto.id, produto.nome, produto.tipo, produto.estoque, produto.preco);
    } catch (err) {
        throw "Erro ao alterar o produto: " + err;
    }      
}

const deleteProdutoDB = async (id) => {
    try {           
        const results = await pool.query(`DELETE FROM produto where id = $1`,[id]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${id} para ser removido`;
        } else {
            return "Produto removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o produto: " + err;
    }     
}

const getProdutoPorIdDB = async (id) => {
    try {           
        const results = await pool.query(`SELECT p.id, p.nome, p.tipo, p.estoque, p.preco FROM produto p WHERE p.id = $1`, [id]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + id;
        } else {
            const produto = results.rows[0];
            return new Produto(produto.id, produto.nome, produto.tipo, produto.estoque, produto.preco);
        }       
    } catch (err) {
        throw "Erro ao recuperar o produto: " + err;
    }     
}

module.exports = {
    getProdutosDB, addProdutoDB, deleteProdutoDB, getProdutoPorIdDB, updateProdutoDB
}