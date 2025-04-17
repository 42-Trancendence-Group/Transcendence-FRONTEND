# Auth-Service

- INFRASTRUCTURE/

    - **Define serviço de hashing** (`bcryptHasher`) dentro da **infraestrutura**, responsável por proteger senhas de forma segura e reutilizável.</br>

    - **Cria conexão com o banco de dados** (`sqlite`) na camada de **infraestrutura**, garantindo persistência de dados e criação da tabela `users`.</br>

    - **Implementa o repositório real** (`userRepoSqlite`) dentro da infraestrutura, respeitando o contrato e conectando diretamente ao banco SQLite.</br>

- DOMAIN/

    - **Define entidade de domínio** (`User`) para representar um usuário como parte da lógica de negócio, desacoplado do banco ou da tecnologia usada.</br>

    - **Cria o contrato (interface informal)** `userRepository.js` para definir o comportamento esperado de qualquer repositório de usuários (ex: `findByEmail`, `save`).</br>

- SHARED/

    - **Define os SCHEMAS** de entrada e saída (`userSchemas.js`) com JSON Schema, usados na validação automática das requisições e respostas nas rotas.</br>

- APPLICATION/

    - **Cria o CASO DE USO** (`registerUser`) na camada de aplicação, contendo a lógica de negócio: validar duplicidade, gerar hash, criar usuário.</br>

- API/

    - **Cria HANDLER** (opcional) ou define função de rota para lidar com request/response, chamando os casos de uso com as dependências corretas.</br>

    - **Define as ROTAS** (`register.js`) que mapeiam os endpoints para funções de manipulação, aplicando validações e orquestrando os casos de uso.</br>

- MAIN/

    - **Inicializa o SERVIDOR Fastify** (`server.js`), injeta dependências como repositório e hasher, e registra as rotas para ativar o serviço.</br>

---

### 💡 Estrutura Conceitual

```plaintext
📁 domain/         → O “coração” do sistema (regras de negócio puras)
📁 application/    → Onde vivem os casos de uso (ações do sistema)
📁 infrastructure/ → O mundo real (DB, hashing, APIs externas)
📁 api/            → Interface HTTP (rotas, handlers, schemas)
📁 shared/         → Código genérico e reutilizável
📄 server.js       → Ponto de entrada do serviço
```

---

