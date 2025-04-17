const Fastify = require("fastify"); // Cria o servidor Fastify
const registerRoutes = require("./api/routes/register"); // Importa rota de registro

// Importa dependências do mundo externo
const userRepo = require("./infrastructure/db/userRepoSqlite");
const hasher = require("./infrastructure/crypto/bcryptHasher");

const app = Fastify(); // Instância do servidor

// Injeta dependências no Fastify (como se fosse um contêiner de injeção)
app.decorate("userRepo", userRepo); // Adiciona userRepo como fastify.userRepo
app.decorate("hasher", hasher); // Adiciona hasher como fastify.hasher

// Registra a rota
app.register(registerRoutes);

// Inicia o servidor na porta 4000
app.listen({ port: 4000 }, () => {
  console.log("✅ Auth service rodando na porta 4000");
});
