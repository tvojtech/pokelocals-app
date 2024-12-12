FROM node:23 AS base
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci --force

COPY . .
RUN npm run build

FROM node:23-alpine3.20 as release
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next

EXPOSE 3000

CMD ["npm", "run", "start"]