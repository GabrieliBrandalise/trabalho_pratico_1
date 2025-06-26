const { Router } = require('express');

const { getAgendamentos, addAgendamento, deleteAplicacao, updateAgendamento } = require('../controlador/aplicacaoControlador');
const { verificaJWT } = require('../controlador/segurancaControlador')
const rotasAplicacao = new Router();

rotasAplicacao.route('/agendamento')
   .get(verificaJWT, getAgendamentos)
   .post(verificaJWT, addAgendamento)
   .put(verificaJWT, updateAgendamento)

rotasAplicacao.route('/agendamento/:id') 
   .delete(verificaJWT, deleteAplicacao)

module.exports = { rotasAplicacao };