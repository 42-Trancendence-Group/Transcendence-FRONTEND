
async function loginUser(email, password, { userRepo, hasher }) {
    const user = await userRepo.findByEmail(email);
  
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
  
    const senhaCorreta = await hasher.compare(password, user.password);
  
    if (!senhaCorreta) {
      throw new Error("Credenciais inválidas");
    }
  
    return { userId: user.id };
  }
  
  module.exports = { loginUser };
  