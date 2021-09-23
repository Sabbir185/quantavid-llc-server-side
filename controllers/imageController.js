// internal import
const Image = require('../models/imageModel');
const User = require('../models/UserModel');


// create post
exports.createImg = async (req, res) => {
    const destination = (req.files[0].destination)
    const filename = (req.files[0].filename)
    const imagePath = destination + filename;
  
    try{

        const newImg = await Image.create(
            {
                image: imagePath,
                user: req.user.id
            }
            );

        console.log(newImg)

        await User.updateOne({ _id: req.user.id}, {$push: {images: newImg._id}});

        res.status(200).json({
            status: 'Post created successfully!',
            data: newImg
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
        const checkPost = await  Image.findById({ _id: req.params.id })
        if(!checkPost){
            return res.status(400).json({
                message: 'file Not Found!',
            });
        }

        const file = await Image.findByIdAndDelete({ _id: req.params.id });
        
        res.status(200).json({
            status: 'Image deleted successfully!',
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
        const files = await Image.find().populate("user").select("-__v").sort('-createdAt')
        
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