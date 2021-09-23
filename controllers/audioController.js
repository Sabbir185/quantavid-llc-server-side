// internal import
const Audio = require('../models/audioModel');
const User = require('../models/UserModel');


// create post
exports.createAudio = async (req, res) => {
    const destination = (req.files[0].destination)
    const filename = (req.files[0].filename)
    const audioPath = destination + filename;
    try{

        const newAudio = await Audio.create(
            {
                audio: audioPath,
                user: req.user.id
            }
            );


        await User.updateOne({ _id: req.user.id}, {$push: {audios: newAudio._id}});

        res.status(200).json({
            status: 'Post created successfully!',
            data: newAudio
        })

    }catch(err){
        res.status(400).json({
            status: 'failed to upload audio!',
            message: err
        })
    }
}


// delete file by id
exports.deleteFile = async (req, res) => {
    try{
        const checkPost = await  Audio.findById({ _id: req.params.id })
        if(!checkPost){
            return res.status(400).json({
                message: 'file Not Found!',
            });
        }

        const file = await Audio.findByIdAndDelete({ _id: req.params.id });
        
        res.status(200).json({
            status: 'Audio deleted successfully!',
            delete: true,
        })

    }catch(err){
        res.status(500).json({
            status: 'Failure!',
            message: err.message
        })
    }
}


// get files
exports.getFiles = async (req, res) => {
    try{
        const files = await Audio.find().populate("user").select("-__v").sort('-createdAt')
        
        res.status(200).json({
            status: 'OK',
            data: files,
        })

    }catch(err){
        res.status(500).json({
            status: 'Failure!',
            message: err.message
        })
    }
}