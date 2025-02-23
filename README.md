# Prerequisites
- Node: v22.14.0
- npm or yarn
- TypeScript

## Technologies
- Express.js
- TypeScript
- TypeORM
- JWT Authentication
- class-validator
- class-transformer
- Helmet
- CORS
- dotenv
- sqlite3
- bcrypt

# Installation
- create envFile base on env.template file
- npm i
- npm run dev

# tutorial
- login: POST http://localhost:3001/login { "username": "admin", "password": "admin" } or info in you .env file
- Get token and pass it to another api:
    1. GET http://localhost:3001/api/resources
    2. GET http://localhost:3001/api/resource/your-params-id
    3. POST http://localhost:3001/api/resource
    3. PUT http://localhost:3001/api/resource/your-params-id
    3. DELETE http://localhost:3001/api/resource/your-params-id
