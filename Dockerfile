FROM nginx:1.21.6-alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY dist/prospectix-front/ /usr/share/nginx/html