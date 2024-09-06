FROM node:20-bullseye-slim AS build
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY ./package.json ./pnpm-lock.yaml ./tsconfig.json ./
ADD src /app/src
RUN corepack enable pnpm && pnpm install --frozen-lockfile
ENV PATH=/app/node_modules/.bin:$PATH
RUN pnpm run build

FROM node:18-bullseye-slim
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY --from=build /app ./
ENV PATH=/app/node_modules/.bin:$PATH
EXPOSE 3000
CMD ["pnpm", "run", "serve"]
