const bcrypt = require('bcryptjs');
const pool = require('../config/db');


class User {
  static async getAllUsers() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM users;');
      connection.release();
      return rows;
    } catch (err) {
      console.error(err) 
    }
  }

  static async checkLoginCredentials(email, password) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM users WHERE email = ?;', [email]);
      connection.release();

      if (rows.length > 0) {
        // Użytkownik o podanej nazwie istnieje
        const user = rows[0];
        console.log(user)
        // Porównaj hasło za pomocą bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          return user;
        } else {
          console.log('Incorrect password');
          return false;
        }
      } else {
        console.log("User doesn't exist");
        return true;
      }
    } catch (err) {
      console.error(err) 
    }
  }

  static async registerUser(nickname, email, password) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        "INSERT INTO `users` (`nickname`, `email`, `password`) VALUES (?, ?, ?)", 
        [nickname, email, bcrypt.hashSync(password, 10)]);
      connection.release();
      return true;
    } catch (err) {
      console.log('User already exists');
      console.error(err)
      return false; 
    }
  }
}

module.exports = User;