# Chat Application

This is a **full-stack real-time chat application** built using **GraphQL, Express, MongoDB, and React**.  
It supports **user authentication, real-time messaging with GraphQL Subscriptions, and media sharing**.

## Features

- User authentication (Signup/Login with JWT)
- One-to-one real-time chat using GraphQL Subscriptions
- Send and receive text messages and media files
- Online/offline user status
- Responsive UI using React and Material-UI
- Backend API using GraphQL and Express
- MongoDB as the database with Mongoose ORM

## Tech Stack

### Backend
- **Node.js** with **Express.js**
- **GraphQL** with **Apollo Server**
- **MongoDB** with **Mongoose**
- **JWT** for authentication

### Frontend
- **React** with **TypeScript**
- **Material UI** for UI components
- **Apollo Client** for GraphQL API integration

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/NGurneet/chat-app.git
cd chat-app
```

### 2. Install Dependencies

#### Backend
```sh
cd backend
npm install
```

#### Frontend
```sh
cd ../frontend
npm install
```

### 3. Configure Environment Variables

#### Backend (`backend/.env`)

```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/chatApp
JWT_SECRET=your_secret_key
```

#### Frontend (`frontend/.env`)

```ini
REACT_APP_GRAPHQL_ENDPOINT=http://localhost:5000/graphql
```

### 4. Start the Application

#### Start Backend
```sh
cd backend
npm run dev
```

#### Start Frontend
```sh
cd frontend
npm start
```

## GraphQL API

### User Authentication

#### Signup
```graphql
mutation {
  signup(username: "testuser", password: "password123") {
    token
    user {
      id
      username
    }
  }
}
```

#### Login
```graphql
mutation {
  login(username: "testuser", password: "securepassword") {
    token
    user {
      id
      username
    }
  }
}
```

### Sending a Message

```graphql
mutation {
  sendMessage(receiverId: "123456789", content: "Hello!") {
    id
    content
    sender {
      username
    }
    receiver {
      username
    }
    createdAt
  }
}
```

### Real-Time Subscription

```graphql
subscription {
  messageSent(receiverId: "123456789") {
    id
    content
    sender {
      username
    }
  }
}
```

## Folder Structure

```
chat-app/
│── backend/
│   ├── src/
│   │   ├── modules/
│   │   ├── graphql/
│   │   ├── app.ts
│   │   ├── database.ts
│   ├── package.json
│   ├── tsconfig.json
│
│── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── apolloClient.ts
│   ├── package.json
│   ├── tsconfig.json
│
└── README.md
```

## License

This project is licensed under the **MIT License**.
