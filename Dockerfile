# Primera etapa
FROM node:20.9.0 as build-step

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.25.4-alpine

COPY --from=build-step /app/dist/front /usr/share/nginx/html

EXPOSE 7500

CMD ["nginx", "-g", "daemon off;"]
