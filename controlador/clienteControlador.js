const {getClientesDB, getClientePorIdDB, addClienteDB, deleteClienteDB, updateClienteDB } = require('../casosUso/clienteCasosUso')

const getClientes = async (request, response) => {
    await getClientesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os clientes: ' + err
        }));
}

const addCliente = async (request, response) => {
    await addClienteDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Cliente cadastrado com sucesso.",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateCliente = async (request, response) => {
    await updateClienteDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Cliente alterado com sucesso.",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteCliente = async (request, response) => {
    await deleteClienteDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
    .catch(err => response.status(400).json({
        status: 'error',
        message: err
    }));
}

const getClientePorId= async (request, response) => {
    await getClientePorIdDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getClientePorId, deleteCliente, updateCliente, addCliente, getClientes
}