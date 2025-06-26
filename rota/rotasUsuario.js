const { Router } = require('express');
const {login, logon} = require('../controlador/segurancaControlador');

const rotasUsuario = new Router();

rotasUsuario.route('/login')
   .post(login)


rotasUsuario.route('/logon')
   .post(logon)

module.exports = { rotasUsuario };