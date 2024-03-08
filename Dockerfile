# Primera etapa
FROM node:20.9.0 as build-step

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . /app

RUN npm run build --prod

# Segunda Etapa
FROM nginx:1.25.4-alpine

COPY --from=build-step /app/dist/front /usr/share/nginx/html

