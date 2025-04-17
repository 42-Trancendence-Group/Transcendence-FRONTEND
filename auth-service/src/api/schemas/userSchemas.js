// Schema para validação automática do corpo da requisição POST /register
const registerBody = {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6 }
    }
  };
  
  // Schema para validar estrutura da resposta (sucesso e erro)
  const registerResponse = {
    201: {
      type: "object",
      properties: {
        userId: { type: "number" },
        message: { type: "string" }
      }
    },
    400: {
      type: "object",
      properties: {
        error: { type: "string" }
      }
    }
  };
  
  module.exports = { registerBody, registerResponse }; // Exporta schemas