FROM nginx
MAINTAINER Pasi Hirvonen <pasi.hirvonen@octo3.fi>

WORKDIR /var/www/app

RUN apt-get update && apt-get install -y --no-install-recommends apt-transport-https curl gnupg2 ca-certificates python-dev build-essential
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y --no-install-recommends nodejs

RUN rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock /var/www/app/
RUN npm install
COPY . /var/www/app

RUN npm run build

COPY ./configs/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]