const { Router } = require('express');
const {login, createAccount, updateUsuario} = require('../controlador/segurancaControlador');

const rotasUsuario = new Router();

rotasUsuario.route('/login')
   .post(login)
   .put(updateUsuario)

rotasUsuario.route('/createaccount')
   .post(createAccount)
   

module.exports = { rotasUsuario };