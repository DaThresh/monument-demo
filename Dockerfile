FROM --platform=linux/amd64 node:18.14-slim

WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json webpack.common.ts webpack.dev.ts webpack.prod.ts /app/

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY server server
COPY client client
COPY shared shared

RUN pnpm build
RUN rm -rf ./client
RUN rm -rf ./server
RUN rm -rf ./shared

RUN pnpm prune --prod

ENV PORT 8080
EXPOSE $PORT

CMD node dist/server/server.js