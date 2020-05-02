# This stage builds the sapper application.
FROM mhart/alpine-node:12 AS build-app
WORKDIR /app
COPY . ./
RUN npm install --no-audit --unsafe-perm
RUN npm run build 

# This stage installs the runtime dependencies.
FROM mhart/alpine-node:12 AS build-runtime
WORKDIR /app
COPY package.json package-lock.json postcss.config.js tailwind.config.js ./
RUN npm ci --production --unsafe-perm

# This stage only needs the compiled Sapper application
# and the runtime dependencies.
FROM mhart/alpine-node:slim-12
WORKDIR /app
COPY --from=build-app /app/__sapper__ ./__sapper__
COPY --from=build-app /app/static ./static
COPY --from=build-runtime /app/node_modules ./node_modules


ENV PORT 8080
ENV HOST 0.0.0.0

EXPOSE 8080
CMD ["node", "__sapper__/build"]