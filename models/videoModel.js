const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    video: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
    
})

const Video = mongoose.model('Video', videoSchema);


module.exports = Video;