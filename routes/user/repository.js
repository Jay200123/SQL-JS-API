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

  async createUserRepository(data) {
    const { username, password, firstname, lastname, phone, address, city } =
      data;
    const QUERY = `
    INSERT INTO users(username, 'password', 'date_created', 'date_modified')
    VALUES(?, ?, NOW(), NOW());

    INSERT INTO user_details(firstname, lastname, phone, address, city, date_created, date_modified, user_id)
    VALUES(?, ?, ?, ?, ?, NOW(), NOW(), LAST_INSERT_ID());
    `;

    return new Promise((resolve, reject) => {
      this.connection.query(
        QUERY,
        [username, password, firstname, lastname, phone, address, city],
        (err, result) => {
          if (err) throw reject(err);
          resolve(result);
        }
      );
    });
  }
}
