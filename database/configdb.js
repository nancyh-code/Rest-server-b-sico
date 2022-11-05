const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN);
    console.log('database online');
  } catch (error) {
    console.log(error);
    throw new Error('Error connecting to database');
  }
};

module.exports = {
  dbConnection,
};
