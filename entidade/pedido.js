class Pedido{
    constructor(id, cliente_id, data_pedido, status, cliente_nome, cliente_telefone) {
       this.id = id;
       this.cliente_id = cliente_id,
       this.data_pedido = data_pedido,
       this.status = status,
       this.cliente_nome = cliente_nome,
       this.cliente_telefone = cliente_telefone
     }     
}

module.exports = Pedido;