const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/users.json');

class User {
  static getAllUsers() {
    try {
      const usersData = fs.readFileSync(filePath, 'utf8');
      const users = JSON.parse(usersData);
      return users;
    } catch (error) {
      console.error('Error reading planes file:', error.message);
      return [];
    }
  }
}

module.exports = User;