FROM node:16.11.1

WORKDIR /app

ADD . .

RUN npm install --unsafe-perm --no-audit --prefer-offline
RUN npm install i -g @nestjs/cli

