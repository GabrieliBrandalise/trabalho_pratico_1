const { getItensPedidoPorIdPedidoDB, deleteItemDB, addItemDB, updateItensDB } = require('../casosUso/itemPedidoCasosUso')

const addItem = async (request, response) => {
    await addItemDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Item adicionado ao pedido com sucesso.",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateItem = async (request, response) => {
    await updateItemDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Item alterado com sucesso.",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteItem = async (request, response) => {
    await deleteItemDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
       
        .catch(err => {
    if (err.toString().includes('atualização ou exclusão em tabela')) {
        return response.status(400).json({
            status: 'error',
            message: 'Não é possível excluir este item porque ele está vinculado a um ou mais pedidos.'
        });
    }
    else {
       return response.status(400).json({
            status: 'error',
            message: err
        });
    }
    });
}

const getItemPorPedidoId = async (request, response) => {
    await getItensPedidoPorIdPedidoDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getItemPorPedidoId, addItem, deleteItem, updateItem
}