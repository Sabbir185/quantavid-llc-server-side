const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: {
        type: String
    },
    image: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
    
},{
    timestamps: true
})

const Image = mongoose.model('Image', imageSchema);


module.exports = Image;