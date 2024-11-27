FROM node:lts-alpine AS base
WORKDIR /app

FROM base AS deps-prod
COPY package*.json ./
RUN npm ci --only=production

FROM base AS deps-dev
COPY package*.json ./
RUN npm ci --dev

FROM base AS build
COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS prod
COPY --from=deps-prod /app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]

EXPOSE 3000

FROM base AS dev
COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]