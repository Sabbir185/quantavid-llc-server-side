const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
    title: {
        type: String
    },
    audio: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
    
},{
    timestamps: true
})

const Audio = mongoose.model('Audio', audioSchema);


module.exports = Audio;