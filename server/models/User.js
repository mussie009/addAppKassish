const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    openid: String,
    
});

mongoose.model('users', userSchema);
