const { Router } = require('express');

const { getPedidoPorId, getPedidos, addPedido, deletePedido, updatePedido } = require('../controlador/pedidoControlador');

const rotasPedido = new Router();

rotasPedido.route('/pedido')
   .get(getPedidos)
   .post(addPedido)
   .put(updatePedido)

rotasPedido.route('/pedido/:id') 
   .get(getPedidoPorId)
   .delete(deletePedido)

module.exports = { rotasPedido };