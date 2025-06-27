const { Router } = require('express');
const {login, createAccount, updateUsuario, getUsuario, verificaJWT} = require('../controlador/segurancaControlador');

const rotasUsuario = new Router();

rotasUsuario.route('/login')
   .post(login)

rotasUsuario.route('/createaccount')
   .post(createAccount)

rotasUsuario.route('/usuario')
   .put(verificaJWT, updateUsuario); 

rotasUsuario.route('/usuario/:id')
   .get(verificaJWT, getUsuario);
   
module.exports = { rotasUsuario };