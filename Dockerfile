FROM  node:lts-alpine

EXPOSE 8080

WORKDIR /Ambientacion

COPY . /Ambientacion

RUN npm install

CMD ["npm", "run", "dev"]
