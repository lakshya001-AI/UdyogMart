const mongoose = require("mongoose");

const contactUsSchema = mongoose.Schema({
    cName:{required:true,type:String},
    cEmail:{required:true,type:String},
    cMessage:{required:true,type:String},
});

async function createUdyogMartContactUsModel(udyogMartConnection) {
    const contactUsModel = udyogMartConnection.model('contactUsModel', contactUsSchema);
    return contactUsModel;
  }
  
  module.exports = createUdyogMartContactUsModel;
