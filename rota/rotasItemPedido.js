const { Router } = require('express');

const { getItemPorPedidoId, addItem, deleteItem, updateItem } = require('../controlador/itemPedidoControlador');
const { verificaJWT } = require('../controlador/segurancaControlador')

const rotasItemPedido = new Router();

rotasItemPedido.route('/itens')
   .post(verificaJWT, addItem)
   .put(verificaJWT, updateItem)

rotasItemPedido.route('/itens/:id') 
   .get(verificaJWT, getItemPorPedidoId)
   .delete(verificaJWT, deleteItem)

module.exports = { rotasItemPedido };