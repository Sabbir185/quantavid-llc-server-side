const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
    
})

const Image = mongoose.model('Image', imageSchema);


module.exports = Image;