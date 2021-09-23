// internal import
const Video = require('../models/videoModel');
const User = require('../models/UserModel');


// create post
exports.createVideo = async (req, res) => {
    const destination = (req.files[0].destination)
    const filename = (req.files[0].filename)
    const videoPath = destination + filename;
  
    try{

        const newVideo = await Video.create(
            {
                video: videoPath,
                user: req.user.id
            }
            );

        console.log(newVideo)

        await User.updateOne({ _id: req.user.id}, {$push: {videos: newVideo._id}});

        res.status(200).json({
            status: 'Post created successfully!',
            data: newVideo
        })

    }catch(err){
        res.status(400).json({
            status: 'failed to upload image!',
            message: err
        })
    }
}



// delete file by id
exports.deleteFile = async (req, res) => {
    try{
        const checkPost = await  Video.findById({ _id: req.params.id })
        if(!checkPost){
            return res.status(400).json({
                message: 'file Not Found!',
            });
        }

        const file = await Video.findByIdAndDelete({ _id: req.params.id });
        
        res.status(200).json({
            status: 'Video deleted successfully!',
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
        const files = await Video.find().populate("user").select("-__v").sort('-createdAt')
        
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