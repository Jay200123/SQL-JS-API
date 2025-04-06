import { environment } from "./config/index.js";
import { users } from "./routes/index.js";
import express from "express";
const app = express();
/**
 * Set express.json() and express.urlencoded() middleware to parse incoming requests
 * The express.json() middleware is used to parse incoming requests with JSON payloads.
 * The express.urlencoded() middleware is used to parse incoming requests with URL-encoded payloads.
 * The extended option allows for rich objects and arrays to be encoded into the URL-encoded format.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Set up default index route
 * The default index route is used to test the server.
 */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to SQL API Server",
  });
});

app.use("/api/v1", users);

/**
 * Set up route middleware for not found routes
 * The route middleware is used to handle requests to routes that are not found.
 */
app.get("/*splat", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/**
 * Starting the server
 * The server is started on the port specified in the environment variables.
 * The server is started using the listen method of the express app.
 * The listen method takes a callback function that is called when the server is started.
 */
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
