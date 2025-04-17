
const bcrypt = require("bcrypt"); // Importa a lib bcrypt para hashing seguro de senhas
const SALT_ROUNDS = 10; // Define o número de rounds de sal — quanto maior, mais seguro (e lento)

// Função assíncrona que recebe uma senha e retorna o hash seguro dela
async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

module.exports = { hashPassword }; // Exporta função para ser usada no use case
