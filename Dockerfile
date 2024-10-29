FROM node:20 AS build

WORKDIR /app

RUN npm install -g @angular/cli@17.3.5

RUN rm -rf node_modules

COPY package*.json ./

RUN npm install --force

COPY . .

RUN ng build self-creation-portal 

FROM node:20 AS final

WORKDIR /usr/src/app

COPY --from=build /app/dist/self-creation-portal ./dist

RUN npm install -g serve

EXPOSE 4200

CMD ["serve", "-s", "dist/self-creation-portal", "-p", "4200"]
