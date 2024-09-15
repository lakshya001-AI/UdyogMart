const mongoose = require("mongoose");

const userMartSchema = mongoose.Schema({
    FullName:{required:true,type:String},
    EmailAddress:{required:true,type:String},
    PhoneNumber:{required:true,type:String},
    Password:{required:true,type:String},
    ConfirmPassword:{required:true,type:String},
    Address:{required:true,type:String},
    City:{required:true,type:String},
    State:{required:true,type:String},
    PostalCode:{required:true,type:String},
    sellerAcceptedRequest:{type:Array, default: []},
    sellerRejectRequest:{type:Array, default: []},
    addToCartProducts: {type:Array, default: []}
});

async function createUdyogMartUserModel(udyogMartConnection) {
    const userMartModel = udyogMartConnection.model('userMartModel', userMartSchema);
    return userMartModel;
  }
  
module.exports = createUdyogMartUserModel;