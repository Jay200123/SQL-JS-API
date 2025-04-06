import dotenv from "dotenv";

class Environment {
  constructor() {
    /**
     *  * Load environment variables from .env file
     * This is important for keeping sensitive information like database credentials and API keys out of the source code.
     * The dotenv package loads the environment variables from the .env file into process.env.
     */
    dotenv.config();
    this.init();
  }

  init() {
    /**
     *  * Load environment variables from .env file
     * This is important for keeping sensitive information like database credentials and API keys out of the source code.
     * The dotenv package loads the environment variables from the .env file into process.env.
     */
    dotenv.config();
  }
}

/**
 * Create a new instance of the Environment class
 * This will load the environment variables from the .env file into process.env.
 */
export const environment = new Environment();
