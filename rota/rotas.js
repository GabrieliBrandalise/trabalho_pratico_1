const { Router } = require('express');

const { rotasProduto } = require('./rotasProduto');
const { rotasCliente } = require('./rotasCliente');
const { rotasPedido } = require('./rotasPedido');

const rotas = new Router();

rotas.use(rotasProduto);
rotas.use(rotasCliente);
rotas.use(rotasPedido);
module.exports = rotas;