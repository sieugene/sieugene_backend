FROM node:16.15.1-alpine3.16 as builder
                               
WORKDIR /app

COPY package.json yarn.lock ./ 
COPY prisma ./prisma/

RUN yarn                       

COPY . .
  
RUN yarn build

FROM node:16.15.1-alpine3.16
  
WORKDIR /app                   
  
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/prisma /app/prisma

CMD yarn start:migrate
