// import model
const User = require('../models/UserModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path')


// user sign up
exports.createUser = async (req, res) => {
    const checkUser = await  User.findOne({email: req.body.email}).select('email -_id');
    if(checkUser){
        return res.status(400).json({
            message: 'User already exist!',
            user: checkUser
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            avatar: req.body.avatar,
            password: hashedPassword
        })

        // folder create according to user's name in public folder
        let dir = path.join(__dirname, `../public/${newUser.name}`);
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }

        const userToken = await jwt.sign(
            {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            process.env.JWT_SECRET,
            {expiresIn: `${process.env.JWT_EXPIRE}`}
        )

        res.status(200).json({
            status: 'new user created successfully!',
            token: userToken,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed!',
            error: {
                message: error.message
            }
        });
    }
}



// user login
exports.userLogin = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email });

        if(user && (await user.matchPassword(password))) {

            const userToken = await user.generateUserJWT();

            res.status(200).json({
                status: 'Login successful!',
                token: userToken,
                user : {
                    id : user._id,
                    name : user.name,
                    email : user.email,
                }
            })

        }else{
            res.status(404).json({
                message: 'Authentication failed!',
            })
        }

    }catch(err){
        res.status(500).json({
            status: 'Authentication failed!',
            error: err.message
        })
    }
}


// get user info by id
exports.getUserInfo = async (req, res) => {
    console.log(req.params.id)
    try{
        const user = await User.findById({_id: req.params.id}).select('-password -__v').populate([
            {
                path: "images",
                model: "Image",
            },
            {
                path: "audios",
                model: "Audio",
            },
            {
                path: "videos",
                model: "Video",
            },
        ]);

        res.status(200).json({
            status: 'successful!',
            user
        })

    }catch(err){
        res.status(500).json({
            status: 'Failed',
            error: {
                message: err.message
            }
        });
    }
}



// update profile image
exports.updateProfile = async (req, res) => {
    
    const destination = (req.files[0].destination)
    const filename = (req.files[0].filename)
    const imagePath = destination + filename;
  
    try{

        const updateUser = await User.findByIdAndUpdate(
            { _id: req.params.id },
            {image: imagePath});

        res.status(200).json({
            status: 'Profile Updated successfully!',
            update: true
        })

    }catch(err){
        res.status(500).json({
            status: 'Failed to update!',
            message: err.message
        })
    }
}