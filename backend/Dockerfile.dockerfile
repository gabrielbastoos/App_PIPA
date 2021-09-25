FROM node:14-alpine AS development
#ENV NODE_ENV development
# Add a work directory

COPY . /code
WORKDIR /code

#WORKDIR /backend
# Cache and Install dependencies
#COPY /backend/package.json .
#COPY npm.lock .
RUN npm install
# Copy app files
#COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "node", "server.js" ]
