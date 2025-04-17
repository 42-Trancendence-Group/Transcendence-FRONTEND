const User = require("../../domain/entities/user"); // Importa a entidade de domínio

/* 
   Define um novo caso de uso
   para registro de um novo usuário

   Esse caso vai receber métodos externos como parâmetros a serem executados,
   sem precisar saber oq fazem e como fazem  { userRepo, hasher }

   recebe senha + email + metodos
   Usa os metodos externos para verificar email repetidos
   Gera hash da senha com métodos externos
   Cria entidade com email e hash com modelo de classe
   Salva no banco com método externo

   Executa todo o fluxo de registro de um novo usuário
   Sem precisar saber como funciona cada método
*/ 
async function registerUser(email, password, { userRepo, hasher }) {
  const existing = await userRepo.findByEmail(email); // Verifica se o e-mail já está cadastrado
  if (existing) {
    throw new Error("Email já cadastrado."); // Regra de negócio: impedir duplicidade
  }

  const hashed = await hasher.hashPassword(password); // Gera o hash da senha
  const user = new User(email, hashed); // Cria entidade com e-mail e hash

  const saved = await userRepo.save(user); // Salva no banco

  return { userId: saved.lastID }; // Retorna ID do novo usuário
}

module.exports = { registerUser }; // Exporta o caso de uso
