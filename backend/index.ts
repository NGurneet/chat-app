// import express, { type Application, type Request, type Response } from "express";
// import bodyParser from "body-parser";
// import morgan from "morgan";
// import http from "http";
// import { ApolloServer } from 'apollo-server-express';

// import { initDB } from "./app/common/services/database.service";
// import { initPassport } from "./app/common/services/passport-jwt.service";
// import { loadConfig } from "./app/common/helper/config.hepler"; // Ensure this path is correct
// import typeDefs from "./app/graphql/schema"; // Ensure this path is correct
// import resolvers from "./app/graphql/resolver"; // Ensure this path is correct
// import { type IUser } from "./app/user/user.dto";
// import errorHandler from "./app/common/middleware/error-handler.middleware";
// import routes from "./app/routes";

// loadConfig();

// declare global {
//   namespace Express {
//     interface User extends Omit<IUser , "password"> {}
//     interface Request {
//       user?: User;
//     }
//   }
// }

// const port = Number(process.env.PORT) || 5000;

// // Explicitly type the app as Application
// const app: Application = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(morgan("dev"));

// const initApp = async (): Promise<void> => {
//   try {
//     await initDB();
//     // initPassport();

//     // Initialize Apollo Server
//     const server = new ApolloServer({ typeDefs, resolvers });
//     await server.start();
//     server.applyMiddleware({ app, path: '/graphql' }); // Set the path for GraphQL

//     app.use("/api", routes);

//     app.get("/", (req: Request, res: Response) => {
//       res.send({ status: "ok" });
//     });

//     app.use(errorHandler);

//     http.createServer(app).listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//       console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
//     });
//   } catch (error) {
//     console.error("Error initializing the application:", error);
//     process.exit(1);
//   }
// };

// // Call the initApp function to start the application
// void initApp();

// import express, { type Application, type Request, type Response } from "express";
// import bodyParser from "body-parser";
// import morgan from "morgan";
// import http from "http";
// import { ApolloServer } from 'apollo-server-express';
// import { initDB } from "./app/common/services/database.service"; // Database connection
// import { initPassport } from "./app/common/services/passport-jwt.service"; // Passport JWT setup
// import { loadConfig } from "./app/common/helper/config.hepler"; // Load environment variables
// import typeDefs from "./app/graphql/schema"; // GraphQL schema
// import resolvers from "./app/graphql/resolver"; // GraphQL resolvers
// import { type IUser } from "./app/user/user.dto"; // User DTO for types
// import errorHandler from "./app/common/middleware/error-handler.middleware"; // Error handler middleware
// import routes from "./app/routes"; // REST API routes
// import jwt from "jsonwebtoken";

// loadConfig(); // Load environment variables

// declare global {
//   namespace Express {
//     interface User extends Omit<IUser, "password"> {}
//     interface Request {
//       user?: User;
//     }
//   }
// }

// const port = Number(process.env.PORT) || 5000;

// // Initialize the Express app
// const app: Application = express();

// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(morgan("dev"));

// const initApp = async (): Promise<void> => {
//   try {
//     // Initialize DB and Passport
//     await initDB();
//     //  initPassport(); // Uncomment if using Passport

//     // Initialize Apollo Server
//     const server = new ApolloServer({
//       typeDefs,
//       resolvers,
//       context: async ({ req }: any) => {
//         const token = req.headers.authorization || "";
//         try {
//           const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//           return { user: decoded.userId };
//         } catch {
//           return {};
//         }
//       },
//     });
//     await server.start();
//     server.applyMiddleware({ app, path: '/graphql' }); // GraphQL endpoint

//     // REST API Routes
//     app.use("/api", routes);

//     // Test route
//     app.get("/", (req: Request, res: Response) => {
//       res.send({ status: "ok" });
//     });

//     // Error handler middleware
//     app.use(errorHandler);

//     // Start HTTP server
//     http.createServer(app).listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//       console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
//     });
//   } catch (error) {
//     console.error("Error initializing the application:", error);
//     process.exit(1);
//   }
// };

// // Start the application
// void initApp();

// app.ts or server.ts (where Apollo Server is set up)
// import { ApolloServer } from 'apollo-server-express';
// import express from 'express';
// import http from 'http';
// import jwt from 'jsonwebtoken';
// import { initDB } from './app/common/services/database.service'; // Your database connection
// import { loadConfig } from './app/common/helper/config.hepler'; // Load environment variables
// import typeDefs from './app/graphql/schema'; // GraphQL schema
// import resolvers from './app/graphql/resolver'; // GraphQL resolvers

// loadConfig();  // Load environment variables

// const app = express();

// // Helper to get user from token
// const getUserFromToken = (token: string) => {
//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//     return decoded.userId;
//   } catch {
//     return null;
//   }
// };

// // Apollo Server setup
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }: any) => {
//     const token = req.headers.authorization || "";
//     const userId = getUserFromToken(token);
//     return { userId };
//   },
// });

// const port = Number(process.env.PORT) || 5000;

// const initApp = async (): Promise<void> => {
//   await initDB();

//   await server.start();
//   server.applyMiddleware({ app, path: '/graphql' });  // GraphQL endpoint

//   http.createServer(app).listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
//   });
// };

// void initApp();


import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import { initDB } from "./app/common/services/database.service"; // Database connection
// import { loadConfig } from "./app/common/helper/config.helper"; // Load environment variables
// import schema from ".app/graphql/index"; // Import merged schema
import resolvers from "./app/graphql/resolver"; // Import merged resolvers
import { loadConfig } from "./app/common/helper/config.hepler";
import schema from "./app/graphql/schema";

loadConfig(); // Load environment variables

const app = express();
const httpServer = createServer(app);

// Helper to get user from token
const getUserFromToken = (token: string) => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded.userId;
  } catch {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = token ? getUserFromToken(token) : null;
    return { user };
  },
});



const port = Number(process.env.PORT) || 4000;

async function startServer() {
  await initDB();
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  httpServer.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

startServer();
