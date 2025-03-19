# IT5007_CRA

## Required

**create .env file in course-project-group-10/rpd folder in order to use openai api:**

**Run this commands in folder rpd, also replace your_api_key_here with your openai api key**

```
touch ./.env && echo "OPENAI_API_KEY='your_api_key_here'" >> ./.env
```
create a .env file for client folder for production API_URL:

**Run this commands in folder rpd:**

```
touch ./client/.env && echo "REACT_APP_API_BASE_URL=http://localhost:8080" >> ./client/.env
```

## Docker container Setup

**Should Have these images mongodb/mongodb-community-server:latest and node:22-alpine**

```
docker compose up --build -d
```

**docker remove container**
```
docker compose down
```

## System setup

**If using docker setup, then following are not required.**

run mogodb database first

```
systemctl start mongod
```

Also initialize the mongodb's <retroplay> database (run scripts ./RPD/scripts):

```
mongosh retroplay ./RPD/scripts/init.mongo.js
```

Install required node_modules:

```
npm install
```

Run in dev:

```
npm run dev
```
