require("dotenv").config();
const Fastify = require("fastify");

const corsPlugin = require("./plugins/cors");
const authRoutes = require("./routes/public/auth");
const createServiceProxy = require("./proxy/serviceProxy");

 const app = Fastify();

//const app = Fastify({ logger: true });

app.register(corsPlugin);
// app.register(require("./plugins/authMiddleware")); ← ativa depois JWT

app.register(authRoutes);

app.register(createServiceProxy({
  prefix: "/user",
  target: "http://user:4001"
}));

app.listen({ port: 3000 }, () => {
  console.log("🚪 API Gateway rodando na porta 3000");
});
