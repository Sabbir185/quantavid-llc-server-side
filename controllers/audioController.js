// internal import
const Audio = require('../models/audioModel');
const User = require('../models/UserModel');


// create post
exports.createAudio = async (req, res) => {
    const destination = (req.files[0].destination)
    const filename = (req.files[0].filename)
    const audioPath = destination + filename;
  console.log(req.files[0])
    try{

        const newAudio = await Audio.create(
            {
                audio: audioPath,
                user: req.user.id
            }
            );

        console.log(newAudio)

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