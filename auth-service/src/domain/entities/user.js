/* 
   Classe da entidade User, que representa o domínio da aplicação

   Posteriormente, algumas lógicas de verificação podem
   ser implementadas aqui, como validação de e-mail, etc.
*/
class User {
    constructor(email, passwordHash) {
      this.email = email;
      this.passwordHash = passwordHash;
    }
  }
  
  module.exports = User; // Exporta a entidade para uso nos casos de uso