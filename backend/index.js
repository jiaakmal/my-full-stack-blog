import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware, requireAuth } from '@clerk/express';
import cors from 'cors'

dotenv.config();
const app = express();


app.use(cors(process.env.CLIENT_URL))

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Clerk middleware for authentication
app.use(clerkMiddleware());
app.use("/webhooks", webhookRouter);
// Middleware to parse JSON bodies
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Routes

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong",
    status: error.status || 500,
  });
});

// Connect to the database and start the server
app.listen(3000, () => {
  connectDB();
  console.log('Server is running on port 3000');
});
