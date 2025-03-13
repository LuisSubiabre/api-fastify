# Usa la imagen oficial de Node.js
FROM node:22-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el resto del código fuente
COPY . /app

# Instala las dependencias
RUN npm install

# Expone el puerto en el que corre Fastify
EXPOSE 3500

# Comando para ejecutar tu servidor
CMD [ "npm", "start" ]