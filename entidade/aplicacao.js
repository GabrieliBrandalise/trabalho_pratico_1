class Aplicacao{
    constructor(id, pedido_id, data_aplicacao, local_aplicacao, status) {
       this.id = id;
       this.pedido_id = pedido_id,
       this.data_aplicacao = data_aplicacao,
       this.local_aplicacao = local_aplicacao,
       this.status = status
     }     
}

module.exports = Aplicacao;