const mongoose = require('mongoose');
const config = require('config');

//Initialize variable called db and get Mongo URI from default.json
const db = config.get('mongoURI');

//Connect DB (mongoose returns promises so use sync/await)
//standard setup below
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
