FROM node:14.20.0-alpine
RUN apk add chromium
ENV CHROME_BIN='/usr/bin/chromium-browser'
RUN npm install && npm build
RUN npm run test