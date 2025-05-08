const { Router } = require('express');

const { getAgendamentos, addAgendamento, deleteAplicacao, updateAgendamento } = require('../controlador/aplicacaoControlador');

const rotasAplicacao = new Router();

rotasAplicacao.route('/agendamento')
   .get(getAgendamentos)
   .post(addAgendamento)
   .put(updateAgendamento)

rotasAplicacao.route('/agendamento/:id') 
   .delete(deleteAplicacao)

module.exports = { rotasAplicacao };