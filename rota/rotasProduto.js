const { Router } = require('express');

const { getProdutos, updateProduto, deleteProduto, getProdutoPorId, addProduto } = require('../controlador/produtoControlador');
const { verificaJWT } = require('../controlador/segurancaControlador')

const rotasProduto = new Router();

rotasProduto.route('/produto')
   .get(getProdutos)
   .post(verificaJWT, addProduto)
   .put(verificaJWT, updateProduto)

rotasProduto.route('/produto/:id') 
   .get(verificaJWT, getProdutoPorId)
   .delete(verificaJWT, deleteProduto)

module.exports = { rotasProduto };