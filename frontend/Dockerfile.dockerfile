FROM node:12.16.3 AS development
#ENV NODE_ENV development
# Add a work directory

#COPY . /code
#WORKDIR /app

#COPY package.json yarn.lock app.json ./

#COPY . /code
#WORKDIR /code
RUN npm i --unsafe-perm -g npm@latest expo-cli@latest

WORKDIR /opt/frontend-container 
#USER node

COPY ./package.json ./package-lock.json ./

# # Cache and Install dependencies
# COPY /frontend/package.json .
# COPY /frontend/yarn.lock .
# COPY . . 

#COPY npm.lock .
#RUN npm i -g npm@latest
#RUN npm i npm@latest
RUN npm install 
RUN npm install @expo/ngrok@^4.1.0 
# Copy app files
#COPY . .
# Expose port
WORKDIR /opt/frontend-container/app

EXPOSE 19000 
EXPOSE 19001 
EXPOSE 19002

#ENV PORT 19006

#ENV ADB_IP "192.168.1.112"
ENV REACT_NATIVE_PACKAGER_HOSTNAME "192.168.1.112"
# Start the app
CMD [ "expo", "start"]