const pool = require('../config/db');

class Plane {
  static async getAllPlanes() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM planes;');
      connection.release();
      return rows;
    } catch (err) {
      console.error(err) 
    }
  }

  static async getPlaneByName(planeName) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM planes WHERE name = ?;', [planeName]);
      connection.release();
      return rows[0];
    } catch (err) {
      console.error(err) 
    }
  }
}


module.exports = Plane;