FROM node:18-alpine

WORKDIR /app

# Instala dependências necessárias
RUN apk add --no-cache git

# Copia arquivos de configuração
COPY package.json package-lock.json ./

# Instala dependências
RUN npm ci

# Copia o restante dos arquivos
COPY . .

# Build da aplicação
RUN npm run build

# Expõe a porta
EXPOSE 3000

# Comando corrigido para iniciar a aplicação
CMD ["npm", "run", "preview"]