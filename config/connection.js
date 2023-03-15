const { connect, connection } = require('mongoose');
require('dotenv').config();

connect('mongodb://localhost/myFaceBook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;