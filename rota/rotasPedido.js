const { Router } = require('express');

const { getPedidoPorId, getPedidos, addPedido, deletePedido, updatePedido } = require('../controlador/pedidoControlador');
const { verificaJWT } = require('../controlador/segurancaControlador')

const rotasPedido = new Router();

rotasPedido.route('/pedido')
   .get(getPedidos)
   .post(verificaJWT, addPedido)
   .put(verificaJWT, updatePedido)

rotasPedido.route('/pedido/:id') 
   .get(verificaJWT, getPedidoPorId)
   .delete(verificaJWT, deletePedido)

module.exports = { rotasPedido };