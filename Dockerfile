FROM node:16-alpine AS builder

WORKDIR /builder

COPY package.json package-lock.json ./
COPY extensions/ extensions/
COPY snapshots/ snapshots/

RUN npm ci && npm run build

FROM directus/directus:10.3

USER node
WORKDIR /directus

COPY --from=builder /builder/snapshots ./snapshots
COPY --from=builder /builder/extensions/directus-extension-permissions ./extensions/directus-extension-permissions
COPY --from=builder /builder/extensions/directus-extension-slugify ./extensions/directus-extension-slugify

CMD npx directus bootstrap && \
    npx directus schema apply snapshots/latest.yml --yes && \
    npx directus start
