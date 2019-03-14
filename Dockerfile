FROM  node

EXPOSE 443

WORKDIR /Ambientacion

COPY . /Ambientacion

RUN npm install

CMD ["npm", "run", "dev"]
