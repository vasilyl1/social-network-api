const { connect, connection } = require('mongoose');

connect('mongodb://localhost/myFaceBook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;