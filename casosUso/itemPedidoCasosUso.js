const { pool } = require('../config');
const ItemPedido = require('../entidade/itempedido');


const getItensPedidoPorIdPedidoDB = async (id) => {
    try {           
        const { rows } = await pool.query(`SELECT ip.id, ip.pedido_id, ip.produto_id, ip.quantidade, ip.preco_unitario, p.nome as produto_nome 
                                            FROM itempedido as ip 
                                            JOIN produto as p on p.id = ip.produto_id
                                            WHERE ip.pedido_id = $1
                                            ORDER BY ip.id DESC `, [id]);
       return rows.map((item) => new ItemPedido(item.id, item.pedido_id, item.produto_id, item.quantidade, item.preco_unitario, item.produto_nome));            
    } catch (err) {
        throw "Erro ao recuperar os itens do pedido: " + err;
    }     
}

const addItemDB = async (body) => {
    try {   
        const {pedido_id, produto_id, quantidade, preco_unitario } = body; 
        const results = await pool.query(`INSERT INTO itempedido (pedido_id, produto_id, quantidade, preco_unitario) 
            VALUES ($1, $2, $3, $4)
            returning id, pedido_id, produto_id, quantidade, preco_unitario`,
        [pedido_id, produto_id, quantidade, preco_unitario]);
        const item = results.rows[0];
        return new ItemPedido(item.id, item.pedido_id, item.produto_id, item.quantidade, item.preco_unitario);
    } catch (err) {
        throw "Erro ao adicionar item ao pedido: " + err;
    }    
}

const updateItensDB = async (body) => {
    try {   
        const { id, pedido_id, produto_id, quantidade, preco_unitario }  = body; 
        const results = await pool.query(`UPDATE itempedido SET pedido_id = $2, produto_id = $3, quantidade = $4, preco_unitario = $5 WHERE id = $1 
        returning id, pedido_id, produto_id, quantidade, preco_unitario`,
        [id, pedido_id, produto_id, quantidade, preco_unitario]);        
        if (results.rowCount == 0){
            throw `Nenhum item encontrado com o código ${id} para ser alterado`;
        }
        const item = results.rows[0];
        return new ItemPedido(item.id, item.pedido_id, item.produto_id, item.quantidade, item.preco_unitario);
    } catch (err) {
        throw "Erro ao alterar o item: " + err;
    }      
}

const deleteItemDB = async (id) => {
    try {           
        const results = await pool.query(`DELETE FROM itempedido where id = $1`,[id]);
        if (results.rowCount == 0){
            throw `Nenhum item encontrado com o código ${id} para ser removido`;
        } else {
            return "Item do pedido removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o item do pedido: " + err;
    }     
}

module.exports = {
    getItensPedidoPorIdPedidoDB, deleteItemDB, addItemDB, updateItensDB
}