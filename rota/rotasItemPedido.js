const { Router } = require('express');

const { getItemPorPedidoId, addItem, deleteItem, updateItem } = require('../controlador/itemPedidoControlador');

const rotasItemPedido = new Router();

rotasItemPedido.route('/itens')
   .post(addItem)
   .put(updateItem)

rotasItemPedido.route('/itens/:id') 
   .get(getItemPorPedidoId)
   .delete(deleteItem)

module.exports = { rotasItemPedido };