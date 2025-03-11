
FROM node:23-slim AS builder

# set working directory
WORKDIR /app

# copies local files to the docker container
COPY . . 

RUN npm install

RUN npm run build

EXPOSE 5173

CMD ["npm", "start"]