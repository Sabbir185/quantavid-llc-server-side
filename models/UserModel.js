const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, 'Minimum length of name is 2'],
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [3, 'Minimum length of password is 3'],
        trim: true
    },
    images: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Image"
        }
    ],
    audios: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Audio"
        }
    ],
    videos: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Video"
        }
    ],
})

const User = mongoose.model('User', userSchema);


module.exports = User;