# Use an official Node runtime as a parent image
FROM node:18-alpine as builder

WORKDIR /workspace

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire workspace into the Docker image

COPY . .

WORKDIR /workspace/packages/registry-client
RUN npm ci
RUN npm run build 

# Set the working directory in the container
WORKDIR /workspace/apps/frontend

RUN npm ci
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine as runner

WORKDIR /app

COPY --from=builder /workspace/apps/frontend/.output ./.output

EXPOSE 3000

CMD [ "/app/.output/server/index.mjs" ] 