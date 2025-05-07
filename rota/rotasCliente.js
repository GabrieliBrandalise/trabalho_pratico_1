const { Router } = require('express');

const { getClientePorId, deleteCliente, updateCliente, addCliente, getClientes } = require('../controlador/clienteControlador');

const rotasCliente = new Router();

rotasCliente.route('/cliente')
   .get(getClientes)
   .post(addCliente)
   .put(updateCliente)

rotasCliente.route('/cliente/:id') 
   .get(getClientePorId)
   .delete(deleteCliente)

module.exports = { rotasCliente };