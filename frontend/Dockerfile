# ---- Estágio de Build ----
# Use uma imagem Node.js oficial como imagem base para o estágio de build.
# Escolha uma versão LTS ou a versão que seu projeto requer.
FROM node:18-alpine AS builder
# Alternativas: node:20-alpine, node:18, node:20

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e package-lock.json (ou yarn.lock)
# Copiar esses arquivos separadamente aproveita o cache do Docker.
COPY package.json package-lock.json* ./

# Instale as dependências do projeto
# Se você tiver muitas dependências que mudam raramente,
# pode ser melhor instalar apenas as dependências de produção primeiro,
# mas para um build frontend, geralmente instalamos tudo.
RUN npm install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Execute o script de build (que deve gerar os arquivos na pasta 'dist' por padrão com Vite)
RUN npm run build

# ---- Estágio de Produção/Serviço ----
# Use uma imagem leve de servidor web, como Nginx.
FROM nginx:1.25-alpine
# Alternativas: httpd-alpine (Apache)

# Copie os artefatos de build (da pasta 'dist') do estágio 'builder'
# para o diretório padrão do Nginx onde ele serve arquivos estáticos.
COPY --from=builder /app/dist /usr/share/nginx/html

# (Opcional) Se você tiver uma configuração Nginx customizada:
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY default.conf /etc/nginx/conf.d/default.conf

# Exponha a porta que o Nginx usa por padrão (porta 80)
EXPOSE 80

# Comando padrão para iniciar o Nginx quando o container rodar
CMD ["nginx", "-g", "daemon off;"]