# Identity-Reconciliation
## Setting up  environment and configuration
* create .env file in root folder and setup your appPORT, dbPORT and appEnv
```
appEnv=development
dbPORT=3306
appPORT=3000
```

* create config/config.json file in root folder and setup your mysql conection configuration
```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

## Install dependencies and dev-dependencies
```
npm install
npm install -D
```
## Run the migration
``` npx sequelize-cli db:migrate ```

## Run the app
```
npm run dev
```
## Sending the request using hostUrl: https://identity-reconciliation.onrender.com
* curl
```
curl --location 'https://identity-reconciliation.onrender.com/v1/identify' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'email=akash@gmail.com' \
--data-urlencode 'phoneNumber=8383841'
```
* postman
![image](https://github.com/akashakyy/Identity-Reconciliation/assets/120940507/077a22e8-8f52-443d-ba09-c30cdec49816)

## Resume Link
https://drive.google.com/file/d/1lIiD7nYoI5kTmBhgQ_HN9AQHEE2LExIW/view?usp=sharing

