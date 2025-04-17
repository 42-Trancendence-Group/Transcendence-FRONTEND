const proxy = require("@fastify/http-proxy");

function createServiceProxy({ prefix, target }) {
  return async function (fastify) {
    fastify.register(proxy, {
      upstream: target,
      prefix,
      rewritePrefix: prefix,
      http2: false
    });
  };
}

module.exports = createServiceProxy;
