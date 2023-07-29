FROM public.ecr.aws/docker/library/node:16.13.2-stretch-slim as build
WORKDIR /var/task
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM public.ecr.aws/docker/library/node:16.13.2-stretch-slim as prod
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.0 /lambda-adapter /opt/extensions/lambda-adapter

WORKDIR /var/task
COPY package.json /var/task/package.json
COPY package-lock.json /var/task/package-lock.json
RUN npm install --production
COPY --from=build /var/task/dist /var/task/dist

ENV PORT=8080
EXPOSE 8080
CMD ["node", "dist/server.js"]
