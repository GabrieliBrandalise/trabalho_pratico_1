class ItensPedido{
    constructor(id, pedido_id, produto_id, quantidade, preco_unitario) {
       this.id = id;
       this.pedido_id = pedido_id;
       this.produto_id = produto_id,
       this.quantidade = quantidade,
       this.preco_unitario = preco_unitario
     }     
}

module.exports = ItensPedido;