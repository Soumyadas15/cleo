FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN touch .env
RUN echo "NEXT_PUBLIC_BACKEND_SERVER=http://cleo.centralindia.cloudapp.azure.com:4000" > .env
RUN npx prisma generate
RUN npm run build
RUN npm prune --production
# --omit=dev


FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
