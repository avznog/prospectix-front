FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
FROM nginx:1.21.6-alpine
COPY --from=builder /usr/src/app/dist/prospectix-front/ /usr/share/nginx/html