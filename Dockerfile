FROM nginx:1.21.6-alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY dist/prospectix7-front/ /usr/share/nginx/html