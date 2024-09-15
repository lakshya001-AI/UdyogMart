const mongoose = require("mongoose");

async function connectUdyogSetuDatabase() {
  try {
    const udyogSetuConnection = mongoose.createConnection("mongodb://localhost:27017/udyogSetuDatabase", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    udyogSetuConnection.once('open', () => {
      console.log("UdyogSetu MongoDB Database is Connected");
    });

    return udyogSetuConnection;  // Return the connection object to use it later for models
  } catch (error) {
    console.log("Error connecting to UdyogSetu Database: ", error);
  }
}

module.exports = connectUdyogSetuDatabase;


