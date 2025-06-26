class Usuario {
    constructor(email, telefone, nome, senha, tipo) {
        this.email = email;
        this.telefone = telefone;
        this.nome = nome;
        this.senha = senha;
        this.tipo = tipo;
    }
}

module.exports = Usuario;