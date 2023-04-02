import { Request, Response } from "express"; // Importing Response and Request interfaces from express library
import database from "./database"; // Importing the database connection pool

// Defining a function that takes a request and response object as parameters
export const getFeeds = (req: Request, res: Response) => {
  database // Accessing the MySQL database using the imported database connection pool
    .query("SELECT * FROM feeds") // Running a SQL query to retrieve all records from the `feeds` table
    .then((result) => {
      const feeds = result[0]; // Storing the retrieved records in an array called feeds
      res.json(feeds); // Sending the feeds array back to the client as a JSON response
    })
    .catch((err) => {
      console.error(err); // Logging the error to console if something goes wrong
      res.status(500).send("Error retrieving data from database"); // Sending HTTP error status code (500) to the client indicating failure of the operation
    });
};
