class ItemPedido{
    constructor(id, pedido_id, produto_id, quantidade, preco_unitario, produto_nome) {
       this.id = id;
       this.pedido_id = pedido_id;
       this.produto_id = produto_id,
       this.quantidade = quantidade,
       this.preco_unitario = preco_unitario,
       this.produto_nome = produto_nome
     }     
}

module.exports = ItemPedido;