# hellowrold

## Project Overview and Features
This project is a simple Node.js application with a frontend interface for looking up and adding names.

## Prerequisites
Ensure the following tools are installed:

- **Node.js 18+** - [Install for Windows](https://nodejs.org/en/download/)
- **Docker Desktop** - [Install for Windows](https://www.docker.com/products/docker-desktop/)
- **Git** - [Install for Windows](https://git-scm.com/download/win)
- **MongoDB 6+** - [Install](https://www.mongodb.com/try/download/community) or run via Docker

## Clone the Repository
```bash
git clone <repository-url>
cd hellowrold
```

## Install Dependencies
```bash
npm install
```

## Run the Application

### Development
Start a local MongoDB instance. For example using Docker:
```bash
docker run -d -p 27017:27017 --name mongo mongo:6
```
Then run the NestJS server:
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm start
```

### Docker
The included `docker-compose.yml` starts the API server and a MongoDB service:
```bash
docker-compose up
```

## Run Tests
```bash
npm test
npm run test:e2e
```

## Frontend
The frontend has been rewritten using React and Material UI.

- Browse dynamic forms at [http://localhost:3000](http://localhost:3000)
- Administer form configurations at [http://localhost:3000/admin.html](http://localhost:3000/admin.html)

Each form is presented in a tabbed interface and submits data back to the server. Admin users can build form fields through the UI without crafting JSON.


