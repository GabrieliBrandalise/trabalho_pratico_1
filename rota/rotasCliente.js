const { Router } = require('express');

const { getClientePorId, deleteCliente, updateCliente, addCliente, getClientes } = require('../controlador/clienteControlador');
const { verificaJWT } = require('../controlador/segurancaControlador')

const rotasCliente = new Router();

rotasCliente.route('/cliente')
   .get(verificaJWT, getClientes)
   .post(verificaJWT,addCliente)
   .put(verificaJWT,updateCliente)

rotasCliente.route('/cliente/:id') 
   .get(verificaJWT,getClientePorId)
   .delete(verificaJWT, deleteCliente)

module.exports = { rotasCliente };