import dotenv from "dotenv"; // Importing dotenv library to load environment variables from .env file
import mysql from "mysql2/promise"; // Importing mysql2/promise library for MySQL database promises

dotenv.config(); // Calling the `config()` method of dotenv to read environment variables from `.env` file in root directory

// Creating a connection pool to handle multiple connections to the database
const database = mysql.createPool({
  host: process.env.DB_HOST, // Extracting the host address of the MySQL server from environment variables
  port: parseInt(process.env.DB_PORT!), // Extracting the port number of the MySQL server from environment variables and converting it to an integer
  user: process.env.DB_USER, // Extracting the username for the MySQL server from environment variables
  password: process.env.DB_PASSWORD, // Extracting the password for the MySQL server from environment variables
  database: process.env.DB_NAME, // Extracting the name of the MySQL database we want to connect to
});

export default database; // Exporting the database connection pool as a default export to use in other modules
