FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/arquisoft/dede_es1a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG API_URI="https://dede-es1a-restapi.herokuapp.com/api"
ENV REACT_APP_API_URI=$API_URI

#Create an optimized version of the webapp
RUN npm run build

#Ver como podemos llamar npm run prod aquí
CMD [ "npm", "run", "prod" ]