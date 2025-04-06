import { connection } from "../../config/index.js";

export class UserRepository {
  constructor() {
    this.connection = connection;
  }

  async getAllUsersRepository() {
    const QUERY = `SELECT * FROM users`;

    return new Promise((resolve, reject) => {
      this.connection.query(QUERY, (err, results) => {
        if (err) {
          throw reject(err);
        }

        resolve(results);
      });
    });
  }

  async getOneUserRepository(id) {
    const QUERY = `SELECT * FROM users WHERE id=?`;

    return new Promise((resolve, reject) => {
      this.connection.query(QUERY, [id], (err, result) => {
        if (err) throw reject(err);
        resolve(result);
      });
    });
  }
}
