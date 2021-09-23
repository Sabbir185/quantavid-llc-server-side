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