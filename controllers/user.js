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
                message: err.message
            }
        });
    }
}


// get user info
exports.getUserInfo = (req, res) => {
    res.send('wlc')
}