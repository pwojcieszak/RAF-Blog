const pool = require('../config/db');

class Comment {
  static async getAllComments() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM comments;');
      connection.release();
      return rows;
    } catch (err) {
      console.error(err) 
    }
  }

  static async getCommentsByTopic(planeName) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM comments WHERE topic  = ? ORDER BY comment_id DESC;', [planeName]);
      connection.release();
      return rows;
    } catch (err) {
      console.error(err) 
    }
  }

  static async addComment(content, nickname, topic) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        "INSERT INTO `comments` (`topic`, `nickname`, `content`) VALUES (?, ?, ?)", 
        [topic, nickname, content]);
      connection.release();
      return true;
    } catch (err) {
      console.log('Comment post failed');
      console.error(err)
      return false; 
    }
  }

  static async deleteCommentByDetails(content, nickname, topic) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        "DELETE FROM `comments` WHERE `topic` = ? AND `nickname` = ? AND `content` = ?", 
        [topic, nickname, content]);
      connection.release();
      return true;
    } catch (err) {
      console.log('Comment deletion failed');
      console.error(err)
      return false; 
    }
  }
}

module.exports = Comment;