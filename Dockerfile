# Use an official Node runtime as a parent image
FROM node:18-alpine as builder

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 make && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

WORKDIR /workspace

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire workspace into the Docker image

COPY . . 

# Set the working directory in the container
WORKDIR /workspace/apps/frontend

RUN npx prisma generate
RUN npm run build

FROM node:18-alpine as runner

WORKDIR /app

COPY --from=builder /workspace/apps/frontend/.output ./.output

EXPOSE 3000

CMD [ "/app/.output/server/index.mjs" ] 