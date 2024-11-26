FROM node:20-alpine as backend

WORKDIR /usr/src/app

COPY --chown=node:node ./ .

RUN npm install --quiet --no-optional --no-fund

RUN npm run build

RUN chown -R node:node /usr/src/app/dist

EXPOSE 5000

CMD ["node", "dist/main"]