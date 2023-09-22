# Use an official Node runtime as a parent image
FROM node:18-alpine as builder

WORKDIR /workspace

# Copy package files
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire workspace into the Docker image

COPY . . 

# Set the working directory in the container
WORKDIR /workspace/apps/frontend

RUN npx prisma generate
RUN yarn build

FROM node:18-alpine as runner

WORKDIR /app

COPY --from=builder /workspace/apps/frontend/.output ./.output

EXPOSE 3000

CMD [ "/app/.output/server/index.mjs" ] 