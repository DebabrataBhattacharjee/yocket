const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Please add first name"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Please add last name"],
        trim: true,
    },
    username: {
        type: String,
        required: [true, "Please add username"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please add email Id"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Posts',
    }],
}, { timestamps: true })


module.exports = mongoose.model('User', UserSchema);
