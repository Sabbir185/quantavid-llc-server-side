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