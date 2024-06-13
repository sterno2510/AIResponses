FROM node:14 AS build

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash \
    && . ~/.nvm/nvm.sh \
    && nvm install 22.2.0 \
    && nvm use 22.2.0 \
    && nvm alias default 22.2.0

WORKDIR /app

COPY package*.json ./

RUN . ~/.nvm/nvm.sh && npm install

COPY . .

RUN . ~/.nvm/nvm.sh && npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
