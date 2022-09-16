FROM node:18-alpine as base

WORKDIR /src
COPY package*.json yarn.lock /
EXPOSE 8080

FROM base as production
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile
COPY . /
CMD ["yarn", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN yarn install
COPY . /
CMD ["yarn", "dev"]
