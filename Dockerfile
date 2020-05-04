# Docker Parent Image
FROM node:10.15-jessie

# Create Directory for the Container
WORKDIR /app

# Intall dependencies 
COPY package.json /app
RUN npm install
RUN npm install -g typescript
RUN npm install -g mocha

# Copy the files we need to our new Directory
COPY . /app

# Build TypeScript and start the server
CMD npm run clean-build && npm run start

# Expose the port outside of the container
EXPOSE 3000