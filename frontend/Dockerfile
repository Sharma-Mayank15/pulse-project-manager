FROM node:21-alpine3.18 AS build

WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000

CMD [ "npm", "run", "preview" ]

FROM nginx:alpine3.17-slim

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/html/*
COPY --from=build /frontend/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]