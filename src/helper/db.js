const mongoose = require('mongoose');

// mongoose connect --
const connectDB = async () => {
      await mongoose.connect('mongodb+srv://ShivprakashSuman:QYqqVplNcaOUaiFx@shivsuman.da8vgbz.mongodb.net/mydbshiv');
       console.log('get Connet to ', mongoose.connection.host);
}

module.exports = connectDB();