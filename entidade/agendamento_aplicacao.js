class Aplicacao{
    constructor(id, pedido_id, data_aplicacao, local_aplicacao, status, cliente_telefone, cliente_nome, descricao_produto, quantidade) {
       this.id = id;
       this.pedido_id = pedido_id,
       this.data_aplicacao = data_aplicacao,
       this.local_aplicacao = local_aplicacao,
       this.status = status,
       this.cliente_nome = cliente_nome,
       this.cliente_telefone = cliente_telefone,
       this.descricao_produto = descricao_produto,
       this.quantidade = quantidade
     }      
}

module.exports = Aplicacao;