# Docker Parent Image
FROM node:10.15-jessie

# Create Directory for the Container
WORKDIR /app

# Intall dependencies 
COPY package.json /app
RUN npm install
RUN npm install -g typescript
RUN npm install -g jest

# Copy the files we need to our new Directory
COPY . /app

# Start the server and transpile src directory to build
CMD npm run start

# Expose the port outside of the container
EXPOSE 3000

# docker run --name expressjs -it -p 3000:3000 -v /Users/sarahgazelle/Documents/git/gazelle51/expressjs-boilerplate:/app test-bp
# docker run --name expressjs_debug -it -p 3000:3000 -v /Users/sarahgazelle/Documents/git/gazelle51/expressjs-boilerplate:/app test-bp npm run watch-debug
# docker run --name expressjs_dev -it -p 3000:3000 -v /Users/sarahgazelle/Documents/git/gazelle51/expressjs-boilerplate:/app test-bp npm run watch-dev
# docker run --name expressjs_test -it -p 3000:3000 -v /Users/sarahgazelle/Documents/git/gazelle51/expressjs-boilerplate:/app test-bp jest