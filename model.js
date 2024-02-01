const mongoose  = require('mongoose');

let Registeruser = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
      },
      verificationToken: {
        type: String,
        required: true,
      },
      profileImage: { type: String },
})
Registeruser.index({ verificationToken: 1 });
const User = mongoose.model('Registeruser', Registeruser);

module.exports = User;