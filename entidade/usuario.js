class Usuario {
    constructor(email, telefone, nome, senha = "", tipo = "C", id = null) {
        this.id = id; 
        this.email = email;
        this.nome = nome;
        this.telefone = telefone;
        this.senha = senha;
        this.tipo = tipo;
    }
}

module.exports = Usuario;