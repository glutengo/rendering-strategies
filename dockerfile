FROM node:10

WORKDIR /usr/src/app

COPY *.json ./
COPY *.js ./
COPY backend ./backend
COPY angular-blog ./angular-blog
COPY react-blog ./react-blog
COPY next-blog ./next-blog

RUN npm install
RUN npm run install:all
RUN npm run build:all

EXPOSE 8082 4200 4201 3000 3001 3002

CMD npm run start:all
