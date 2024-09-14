
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
      username: {
            type: String,
            required: true,
            unique: true
      },
      email: {
            type: String,
            required: true,
            unique: true
      },
      password: {
            type: String,
            required: true
      },
      image: {
            type: String,
            required: false
      },
      is_admin: {
            type: String,
            required: false
      },
      is_varified: {
            type: String,
            default: 0
      }
});

module.exports = mongoose.model('User', UserSchema);