const {getPedidosDB, addPedidoDB, updatePedidoDB, deletePedidoDB, getPedidoPorIdDB} = require('../casosUso/pedidoCasosUso')

const getPedidos = async (request, response) => {
    await getPedidosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os pedidos: ' + err
        }));
}

const addPedido = async (request, response) => {
    await addPedidoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Pedido cadastrado com sucesso.",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updatePedido = async (request, response) => {
    await updatePedidoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Pedido alterado com sucesso.",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deletePedido = async (request, response) => {
    await deletePedidoDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
    .catch(err => response.status(400).json({
        status: 'error',
        message: err
    }));
}

const getPedidoPorId= async (request, response) => {
    await getPedidoPorIdDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getPedidoPorId, getPedidos, addPedido, deletePedido, updatePedido
}