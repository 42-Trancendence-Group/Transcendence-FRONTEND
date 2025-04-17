const { registerBody, registerResponse } = require("../schemas/userSchemas"); // Schemas de validação
const { registerUser } = require("../../application/use_cases/registerUser"); // Caso de uso


// Define rota de registro para esse servidor fastify
module.exports = async function (fastify) {
  fastify.post("/register", { // resgistro de POST para rota /register
    schema: {
      body: registerBody, // Validação automática da entrada
      response: registerResponse // Validação da resposta esperada
    }
  }, async (request, reply) => { // Define uma ação associada à rota
    const { email, password } = request.body; // Extrai dados do corpo da requisição

    try {
      // Executa o caso de uso, passando as dependências como argumentos

      /*
        A lógica da ação está em registerUser() e nessa função só é aplicada
        e validada a entrada e saída possivel.
      */
      const result = await registerUser(email, password, {
        userRepo: fastify.userRepo,
        hasher: fastify.hasher
      });

      // Retorna resposta com status 201 e dados
      reply.code(201).send({
        userId: result.userId,
        message: "Usuário criado com sucesso"
      });

    } catch (err) {
      // Erro esperado, como "email duplicado"
      reply.code(400).send({ error: err.message });
    }
  });
};
