const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [3, 'Minimum length of password is 3'],
        trim: true
    },
    avatar: {
        type: String,
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
},{
    timestamps: true
})


// password checking
userSchema.methods.matchPassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}


// generate token for user
userSchema.methods.generateUserJWT = async function() {
    return await jwt.sign(
        {id: this._id, name: this.name, email: this.email},
        process.env.JWT_SECRET,
        {
            expiresIn: `${ process.env.JWT_EXPIRE}`
        }
    )
}


// create model
const User = mongoose.model('User', userSchema);

// export module
module.exports = User;