// BAIXAR O NODEMON PARA NÃO FICAR DANDO REBOOT NO DOCKER

require("dotenv").config();
const Fastify = require("fastify");
//const proxy = require("@fastify/http-proxy"); //ja esta sendo usado no /proxy/serviceProxy.js
const corsPlugin = require("./plugins/cors");
const createServiceProxy = require("./proxy/serviceProxy"); 

// Deifinição de configuração do servidor
async function buildServer() {
  const app = Fastify();
  // const app = Fastify({ logger: true });
  await app.register(corsPlugin);

  // ASSINATURA DIRETA DE PROXY, DESCARTADO
  // await app.register(proxy, {
  //   upstream: "http://auth-service:4000",
  //   prefix: "/auth",
  //   rewritePrefix: "",
  //   http2: false
  // });

  // Assinatur automatica de Proxy, usando o plugin
  app.register(createServiceProxy({
  prefix: "/auth",
  target: "http://auth-service:4000"
  }));

  // Mostrar rotas após todos os registros (Descartavel)
  await app.ready();
  console.log("📦 Rotas disponíveis:");
  console.log(app.printRoutes());

}

// Chamada de Função de inicialização do servidor
buildServer().catch(err => {
  console.error("Erro ao iniciar o servidor:", err);
  process.exit(1);
});