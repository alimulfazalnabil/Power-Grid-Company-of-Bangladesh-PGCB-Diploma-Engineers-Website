FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY apps/cms/package.json ./apps/cms/package.json
RUN corepack enable && pnpm install
COPY . .
WORKDIR /app/apps/cms
EXPOSE 3001
CMD ["pnpm", "dev"]
