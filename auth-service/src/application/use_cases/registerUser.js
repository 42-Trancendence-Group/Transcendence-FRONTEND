/*
const User = require("../../domain/entities/user"); // Importa a entidade de domínio

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
*/ 

const User = require("../../domain/entities/user"); // Entidade
const speakeasy = require("speakeasy"); // Para gerar o segredo TOTP

/*
   Caso de uso para registro de novo usuário com 2FA obrigatório

   - Verifica duplicidade
   - Gera hash da senha
   - Gera segredo 2FA
   - Cria entidade
   - Salva no banco
   - Retorna ID e otpauthUrl (para o frontend gerar QR Code)
*/
async function registerUser(email, password, { userRepo, hasher }) {
  const existing = await userRepo.findByEmail(email);
  if (existing) {
    throw new Error("Email já cadastrado.");
  }

  const hashed = await hasher.hashPassword(password);

  // 🔐 Gera segredo 2FA para o novo usuário
  const secret = speakeasy.generateSecret({
    name: `Transcendence:${email}` // aparece no app do Google Authenticator
  });

  // Cria entidade User com segredo
  const user = new User(email, hashed, secret.base32);

  const saved = await userRepo.save(user);
  user.setId(saved.lastID); // Define ID depois de salvar

  return {
    userId: user.id,
    otpauthUrl: secret.otpauth_url // usado no frontend para exibir o QR Code
  };
}

module.exports = { registerUser };
