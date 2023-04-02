import express, { json } from "express"; // Importing express library and json middleware for parsing JSON in request body
import cors from "cors"; // Importing cors library for Cross-Origin Resource Sharing
import dotenv from "dotenv"; // Importing dotenv library for environment variable configuration
import { parseRSS } from "./rssParser"; // Importing custom RSS parser function
import { getFeeds } from "./getFeeds"; // Importing custom `getFeeds` API function to return array of feed items

dotenv.config(); // Calling `config()` method of dotenv to read environment variables from `.env` file in root directory
const EXPRESS_PORT = parseInt(process.env.EXPRESS_PORT ?? "5005", 10); // Extracting port number for Express server from environment variables, defaulting to 5005

const app = express(); // Creating an instance of Express app

app.use(cors()); // Applying CORS middleware to enable Cross-Origin requests
app.use(json()); // Applying json middleware to parse incoming JSON data in request body

// Registering API routes using HTTP GET protocol
app.get("/api/rss", parseRSS); // Route to parse RSS feeds from URLs
app.get("/api/feeds", getFeeds); // Route to retrieve list of feed items from database

// Starting Express server to listen on specific port
app.listen(EXPRESS_PORT, () => {
  console.log("Express listening on port", EXPRESS_PORT); // Logging a message to the console upon successful initialization of server
});
