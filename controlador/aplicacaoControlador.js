const { getAplicacaoDB, deleteAplicacaoDB, addAplicacaoDB, updateAplicacaoDB} = require('../casosUso/aplicacaoCasosUso')

const getAgendamentos = async (request, response) => {
    await getAplicacaoDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar agendamento de aplicação: ' + err
        }));
}

const addAgendamento = async (request, response) => {
    await addAplicacaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Agendamento de aplicação cadastrado com sucesso.",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateAgendamento = async (request, response) => {
    await updateAplicacaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Agendamento de aplicação alterado com sucesso.",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteAplicacao = async (request, response) => {
    await deleteAplicacaoDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
    .catch(err => response.status(400).json({
        status: 'error',
        message: err
    }));
}


module.exports = {
    getAgendamentos, addAgendamento, deleteAplicacao, updateAgendamento
}