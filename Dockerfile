FROM node:16-alpine AS builder

WORKDIR /builder

COPY package.json package-lock.json ./
COPY extensions/ extensions/

RUN npm ci && npm run build

FROM directus/directus:latest

USER node
WORKDIR /directus

COPY snapshots/ ./snapshots/

COPY --from=builder /builder/extensions/directus-extension-permissions ./extensions/directus-extension-permissions

CMD npx directus bootstrap && \
    npx directus schema apply snapshots/latest.yml --yes && \
    npx directus start
