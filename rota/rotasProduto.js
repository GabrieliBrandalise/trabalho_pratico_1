const { Router } = require('express');

const { getProdutos, updateProduto, deleteProduto, getProdutoPorId, addProduto } = require('../controlador/produtoControlador');

const rotasProduto = new Router();

rotasProduto.route('/produto')
   .get(getProdutos)
   .post(addProduto)
   .put(updateProduto)

rotasProduto.route('/produto/:id') 
   .get(getProdutoPorId)
   .delete(deleteProduto)

module.exports = { rotasProduto };