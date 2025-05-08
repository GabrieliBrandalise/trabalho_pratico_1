const { pool } = require('../config');
const Pedido = require('../entidade/pedido')

const getPedidosDB = async () => {
    try {    
        const { rows } = await pool.query(`SELECT pe.id, pe.cliente_id, to_char(pe.data_pedido,'YYYY-MM-DD') as data_pedido, pe.status, c.nome as cliente_nome, c.telefone as cliente_telefone
                                            FROM pedido as pe
                                            JOIN cliente as c on c.id = pe.cliente_id
                                            ORDER BY pe.id`);
        return rows.map((pedido) => new Pedido(pedido.id, pedido.cliente_id, pedido.data_pedido, pedido.status, pedido.cliente_nome, pedido.cliente_telefone));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addPedidoDB = async (body) => {
    try {   
        const { cliente_id, data_pedido, status } = body; 
        const results = await pool.query(`INSERT INTO pedido (cliente_id, data_pedido, status) 
            VALUES ($1, $2, $3)
            returning id, cliente_id, to_char(data_pedido,'YYYY-MM-DD') as data_pedido, status`,
        [cliente_id, data_pedido, status]);
        const pedido = results.rows[0];
        return new Pedido(pedido.id, pedido.cliente_id, pedido.data_pedido, pedido.status);
    } catch (err) {
        throw "Erro ao cadastrar o pedido: " + err;
    }    
}

const updatePedidoDB = async (body) => {
    try {   
        const { id, cliente_id, data_pedido, status }  = body; 
        const results = await pool.query(`UPDATE pedido SET cliente_id = $2, data_pedido = $3, status = $4 WHERE id = $1 
        returning id, cliente_id, to_char(data_pedido,'YYYY-MM-DD') as data_pedido, status`,
        [id, cliente_id, data_pedido, status]);        
        if (results.rowCount == 0){
            throw `Nenhum pedido encontrado com o código ${id} para ser alterado`;
        }
        const pedido = results.rows[0];
        return new Pedido(pedido.id, pedido.cliente_id, pedido.data_pedido, pedido.status);
    } catch (err) {
        throw "Erro ao alterar o pedido: " + err;
    }      
}

const deletePedidoDB = async (id) => {
    try {           
        const results = await pool.query(`DELETE FROM pedido where id = $1`,[id]);
        if (results.rowCount == 0){
            throw `Nenhum pedido encontrado com o código ${id} para ser removido`;
        } else {
            return "Pedido removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o pedido: " + err;
    }     
}

const getPedidoPorIdDB = async (id) => {
    try {           
        const results = await pool.query(`SELECT pe.id, pe.cliente_id, to_char(pe.data_pedido,'YYYY-MM-DD') as data_pedido, pe.status, c.nome as cliente_nome, c.telefone as cliente_telefone
                                            FROM pedido as pe
                                            JOIN cliente as c on c.id = pe.cliente_id
                                            WHERE pe.id = $1
                                            ORDER BY pe.id`, [id]);
        if (results.rowCount == 0){
            throw "Nenhum pedido encontrado com o código: " + id;
        } else {
            const pedido = results.rows[0];
            return new Pedido(pedido.id, pedido.cliente_id, pedido.data_pedido, pedido.status, pedido.cliente_nome, pedido.cliente_telefone);
        }       
    } catch (err) {
        throw "Erro ao recuperar o pedido: " + err;
    }     
}

module.exports = {
    getPedidosDB, addPedidoDB, updatePedidoDB, deletePedidoDB, getPedidoPorIdDB
}