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
    return comments.filter(comment => comment.topic === formattedPlaneName);
  }

  static addComment(content, nickname, topic) {
    const comments = Comment.getAllComments();
    comments.push({
      content: content,
      nickname: nickname,
      topic: topic,
    });

    // Saving edited array
    const jsonString = JSON.stringify(comments, null, 2);
    fs.writeFile('data/comments.json', jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
        return true;
      } else {
        console.log('Array saved to JSON file successfully!');
        return false;
      }
    });
  }

  static deleteCommentByDetails(content, nickname, topic) {
    const comments = Comment.getAllComments();
    const updatedComments = comments.filter(comment =>
      comment.content !== content ||
      comment.nickname !== nickname ||
      comment.topic !== topic
    );
    try {
      fs.writeFileSync(filePath, JSON.stringify(updatedComments, null, 2), 'utf8');
      return true; 
    } catch (error) {
      console.error('Error writing to comments file:', error.message);
      return false;
    }
  }
}

module.exports = Comment;