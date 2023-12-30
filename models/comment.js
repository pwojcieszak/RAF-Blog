const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/comments.json');

class Comment {
  static getAllComments() {
    try {
      const commentsData = fs.readFileSync(filePath, 'utf8');
      const comments = JSON.parse(commentsData);
      return comments;
    } catch (error) {
      console.error('Error reading comments file:', error.message);
      return [];
    }
  }

  static getCommentsByName(planeName) {
    let formattedPlaneName = planeName.charAt(0).toUpperCase() + planeName.slice(1);
    const comments = Comment.getAllComments();
    return comments.find(comment => comment.topic === formattedPlaneName);
  }
}

module.exports = Comment;