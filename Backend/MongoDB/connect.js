const mongoose = require("mongoose");

async function connectUdyogMartDatabase() {
  try {
    const udyogMartConnection = mongoose.createConnection("mongodb+srv://makodelakshya101:1kZJsMrKNzu9XtI4@udyogmartcluster.ahw33.mongodb.net/?retryWrites=true&w=majority&appName=udyogMartCluster", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    udyogMartConnection.once('open', () => {
      console.log("UdyogMart MongoDB Database is Connected");
    });

    return udyogMartConnection;  // Return the connection object to use it later for models
  } catch (error) {
    console.log("Error connecting to UdyogMart Database: ", error);
  }
}

module.exports = connectUdyogMartDatabase;

