const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
    audio: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
    
})

const Audio = mongoose.model('Audio', audioSchema);


module.exports = Audio;