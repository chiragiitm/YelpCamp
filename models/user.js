const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.plugin(passportLocalMongoose); // adds username and password into schema and makes username unique

module.exports = mongoose.model('User', userSchema);
