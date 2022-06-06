FROM node:alpine

# Create directory
WORKDIR /testgram-server

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn config set "strict-ssl" false -g
RUN yarn install

# Bundle source
COPY . .

# Build source
RUN yarn build

CMD ["yarn", "start-production"]
