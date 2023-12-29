const bcrypt = require('bcryptjs');

const usersData = [
  {
    nickname: "John",
    email: "john@example.com",
    password: bcrypt.hashSync("password123", 10),
  },
  {
    nickname: "Jane",
    email: "jane@example.com",
    password: bcrypt.hashSync("secret456", 10),
  }
];

module.exports = usersData;