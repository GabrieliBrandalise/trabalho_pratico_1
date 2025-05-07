const { getProdutosDB, addProdutoDB, updateProdutoDB, deleteProdutoDB, getProdutoPorIdDB } = require('../casosUso/produtoCasosUso')

const getProdutos = async (request, response) => {
    await getProdutosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os produtos: ' + err
        }));
}

const addProduto = async (request, response) => {
    await addProdutoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Produto cadastrado com sucesso.",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateProduto = async (request, response) => {
    await updateProdutoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Produto alterado com sucesso.",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteProduto = async (request, response) => {
    await deleteProdutoDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
       
        .catch(err => {
    if (err.toString().includes('atualização ou exclusão em tabela')) {
        return response.status(400).json({
            status: 'error',
            message: 'Não é possível excluir este produto porque ele está vinculado a um ou mais pedidos.'
        });
    }})
    .catch(err => response.status(400).json({
        status: 'error',
        message: err
    }));
}

const getProdutoPorId = async (request, response) => {
    await getProdutoPorIdDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getProdutos, addProduto, updateProduto, deleteProduto, getProdutoPorId
}