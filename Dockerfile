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
COPY --from=builder /builder/extensions/directus-extension-webhooks ./extensions/directus-extension-webhooks
COPY --from=builder /builder/extensions/directus-extension-confirm-email ./extensions/directus-extension-confirm-email
COPY --from=builder /builder/extensions/directus-extension-user-roles ./extensions/directus-extension-user-roles
COPY --from=builder /builder/extensions/templates ./extensions/templates

CMD npx directus bootstrap && \
    npx directus schema apply snapshots/latest.yml --yes && \
    npx directus start
