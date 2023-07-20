# FROM nginx:1.21.6-alpine

# COPY default.conf /etc/nginx/conf.d/default.conf
# COPY prospectix-front/ /usr/share/nginx/html

FROM node:16.15-alpine3.16

WORKDIR /app
COPY ["package*.json","./"]
RUN yarn install
COPY . ./
EXPOSE 4200

# build app
RUN yarn build

# start app
CMD ["yarn", "start"]
