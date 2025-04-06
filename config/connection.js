import mysql from "mysql2";
import { environment } from "./environment.js";

/**
 *  * This class is responsible for creating a connection pool to the MySQL database.
 */
class Connection {
  constructor() {
    /**
     * * Create a connection pool to the MySQL database using the mysql library.
     * The connection pool allows multiple connections to be created and managed efficiently.
     * * The connection pool is created with the following options:
     * - connectionLimit: The maximum number of connections to create at once.
     * - host: The hostname of the database server.
     * - user: The username to use for connecting to the database.
     * - password: The password to use for connecting to the database.
     * - database: The name of the database to connect to.
     * * The connection pool is created using the createPool method of the mysql library.
     * The connectionLimit option is set to 10, which means that a maximum of 10 connections can be created at once.
     */
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    this.init(); /**  Initialize the connection pool */
  }

  init() {
    this.pool.getConnection((err, connection) => {
      /**
       *  * Check for errors while connecting to the database.
       * If there is an error, log the error message and the current date.
       * This is important for debugging and monitoring the application.
       * The error message will help identify the issue with the connection.
       */
      if (err) {
        console.log(
          `Error connecting to the database: ${err} - ${new Date().toLocaleDateString()}`
        );
      }

      /**
       * If the connection was successful, log the success message and release the connection back to the pool every connection to the database.
       * This is important to avoid connection leaks and ensure that the pool can manage connections efficiently.
       * The connection is released back to the pool after use, so it can be reused for future requests.
       * This is a good practice to avoid creating too many connections to the database and to ensure that the application can handle multiple requests efficiently.
       */
      if (connection) {
        /** 
        * Release the connection back to the pool
        */
        connection.release(); 
        console.log(
          `Database connection released successfully - ${new Date().toLocaleDateString()}`
        );
      }
    });
  }

  getPool() {
    /**
     *  * This method returns the connection pool created in the constructor.
     * The connection pool can be used to create connections to the database.
     * This is useful for executing queries and performing database operations.
     */
    return this.pool;
  }
}

/**
 * Create a new instance of the Connection class
 */
export const connection = new Connection().getPool();
