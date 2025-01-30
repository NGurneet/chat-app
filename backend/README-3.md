# Chat Application - Backend

## 📌 Project Overview

This is the backend for a real-time chat application built using
**Express, TypeScript, MongoDB, and GraphQL (Apollo Server)**. It
supports user authentication, real-time messaging via GraphQL
subscriptions, and media sharing.

## 🚀 Features

-   **User Authentication** (Signup, Login, JWT-based authentication)
-   **Real-time one-to-one chat** using GraphQL Subscriptions
-   **Message Storage** in MongoDB with TypeORM
-   **Media Sharing** (Images, Videos, etc.)
-   **Error Handling & Validation**

## 🛠️ Tech Stack

-   **Backend**: Node.js, Express, TypeScript
-   **Database**: MongoDB, TypeORM
-   **GraphQL**: Apollo Server, Subscriptions
-   **Authentication**: JWT

------------------------------------------------------------------------

## 📥 Installation

### **1️⃣ Clone the Repository**

\`\`\`sh git clone https://github.com/NGurneet/chat-app.git cd backend

2️⃣ Install Dependencies npm install 3️⃣ Set Up Environment Variables
Create a .env file and configure the following: PORT=4000
MONGO_URI=mongodb://localhost:27017/chat-app JWT_SECRET=your_secret_key
4️⃣ Start the Server npm run dev The backend will be running on
http://localhost:4000/graphql 📡 API Endpoints

Since this is a GraphQL backend, all requests are handled via Apollo
Server. Visit http://localhost:4000/graphql to explore GraphQL
Playground. Example GraphQL Queries 🔑 User Authentication mutation {
signup(username: "john_doe", email: "john@example.com", password:
"password123") { token user { id username } } } 📩 Send Message mutation
{ sendMessage(receiverId: "679b699250650f85b9e9ae9f", content: "Hello!")
{ id content sender { id username } receiver { id username } } } 📡
Subscribe to Messages (Real-time updates) subscription {
messageReceived(receiverId: "679b699250650f85b9e9ae9f") { id content
sender { username } } } 📜 Folder Structure

backend/ ├── src/ │ ├── app/ │ │ ├── modules/ │ │ │ ├── auth/ │ │ │ ├──
chat/ │ │ ├── config/ │ │ ├── database/ │ ├── server.ts │ ├── index.ts
├── package.json ├── tsconfig.json ✅ Next Steps

Implement group chat Add file storage (AWS S3, Cloudinary) Improve error
handling and performance 🚀 Happy Coding! 🎉

If you need any modifications or additional information included in this
`README.md`, please let me know!
::contentReference[oaicite:0]{index="0"}
