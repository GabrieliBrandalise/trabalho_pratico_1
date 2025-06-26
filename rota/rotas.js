const { Router } = require('express');

const { rotasProduto } = require('./rotasProduto');
const { rotasCliente } = require('./rotasCliente');
const { rotasPedido } = require('./rotasPedido');
const { rotasAplicacao } = require('./rotasAplicacao');
const { rotasItemPedido } = require('./rotasItemPedido');
const { rotasUsuario} = require('./rotasUsuario');
const rotas = new Router();

rotas.use(rotasProduto);
rotas.use(rotasCliente);
rotas.use(rotasPedido);
rotas.use(rotasAplicacao);
rotas.use(rotasItemPedido);
rotas.use(rotasUsuario);
module.exports = rotas;