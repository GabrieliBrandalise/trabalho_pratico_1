const { pool } = require('../config');
const Aplicacao = require('../entidade/agendamento_aplicacao')

const getAplicacaoDB = async () => {
    try {    
        const { rows } = await pool.query(`SELECT  a.id, a.pedido_id, to_char(a.data_aplicacao,'YYYY-MM-DD') as data_aplicacao , a.local_aplicacao, a.status_aplicacao as status,
                                            c.telefone as cliente_telefone, c.nome as cliente_nome, p.nome as descricao_produto, ip.quantidade as quantidade	
                                            FROM aplicacao as a 
                                            JOIN pedido as pe on a.pedido_id = pe.id
                                            JOIN cliente as c on pe.cliente_id = c.id
                                            JOIN itens_pedido as ip on pe.id = ip.pedido_id
                                            JOIN produto as p on p.id = ip.produto_id
                                            GROUP BY a.id, c.telefone, c.nome, p.nome, ip.quantidade
                                            ORDER BY data_aplicacao DESC`);
        return rows.map((aplicacao) => new Aplicacao(aplicacao.id, aplicacao.pedido_id, aplicacao.data_aplicacao, aplicacao.local_aplicacao, aplicacao.status, aplicacao.cliente_telefone, aplicacao.cliente_nome, aplicacao.descricao_produto ));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addAplicacaoDB = async (body) => {
    try {   
        const { pedido_id, data_aplicacao, local_aplicacao, status } = body; 
        const results = await pool.query(`INSERT INTO aplicacao (pedido_id, data_aplicacao, local_aplicacao, status_aplicacao) 
            VALUES ($1, $2, $3, $4)
            returning id, pedido_id, to_char(data_aplicacao,'YYYY-MM-DD') as data_aplicacao, status_aplicacao as status`,
        [pedido_id, data_aplicacao, local_aplicacao, status]);
        const aplicacao = results.rows[0];
        return new Aplicacao(aplicacao.id, aplicacao.pedido_id, aplicacao.data_aplicacao, aplicacao.local_aplicacao, aplicacao.status);
    } catch (err) {
        throw "Erro ao agendar aplicação: " + err;
    }    
}

const updateAplicacaoDB = async (body) => {
    try {   
        const { id, pedido_id, data_aplicacao, local_aplicacao, status }  = body; 
        const results = await pool.query(`UPDATE aplicacao SET pedido_id = $2, data_aplicacao = $3, local_aplicacao = $4, status_aplicacao = $5 WHERE id = $1 
        returning id, pedido_id, to_char(data_aplicacao,'YYYY-MM-DD') as data_aplicacao, status_aplicacao as status`,
        [id, pedido_id, data_aplicacao, local_aplicacao, status]);        
        if (results.rowCount == 0){
            throw `Nenhum agendamento de aplicação encontrado com o código ${id} para ser alterado`;
        }
        const aplicacao = results.rows[0];
        return new Aplicacao(aplicacao.id, aplicacao.pedido_id, aplicacao.data_aplicacao, aplicacao.local_aplicacao, aplicacao.status);
    } catch (err) {
        throw "Erro ao alterar o agendamento: " + err;
    }      
}

const deleteAplicacaoDB = async (id) => {
    try {           
        const results = await pool.query(`DELETE FROM aplicacao where id = $1`,[id]);
        if (results.rowCount == 0){
            throw `Nenhum agendamento de aplicação encontrado com o código ${id} para ser removido`;
        } else {
            return "Agendamento de aplicação removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o agendamento de aplicação: " + err;
    }     
}

module.exports = {
    getAplicacaoDB, deleteAplicacaoDB, addAplicacaoDB, updateAplicacaoDB
}