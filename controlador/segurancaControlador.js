const { autenticaUsuarioDB, addUsuarioDB, updateUsuarioDB, getUsuarioByIdDB } = require('../casosUso/segurancaCasosUso');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    await autenticaUsuarioDB(request.body)
        .then(usuario => {
            const token = jwt.sign({ usuario }, process.env.SECRET, {
                expiresIn: 300 
            })
            return response.json({ auth: true, token: token, usuario })
        })
        .catch(err => response.status(401).json({ auth: false, message: err }));
}

const createAccount = async (request, response) => {
    await addUsuarioDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Usuário cadastrado com sucesso.",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateUsuario = async (request, response) => {
    await updateUsuarioDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Usuário alterado com sucesso.",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

function verificaJWT(request, response, next) {
    const token = request.headers['authorization'];
    if (!token) return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return response.status(401).json({ auth: false, message: 'Erro ao autenticar o token.' });
        console.log("Usuario: " + JSON.stringify(decoded.usuario));
        request.usuario = decoded.usuario;
        next();
    });
}

const getUsuario = async (request, response) => {
    await getUsuarioByIdDB(request.params.id)
        .then(usuario => response.status(200).json({
            status: "success",
            objeto: usuario
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

module.exports = {
    login, verificaJWT, createAccount, updateUsuario, getUsuario
}