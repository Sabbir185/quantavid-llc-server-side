const uploader = require('../utilities/singleFileUpload');
const path = require('path');

function files(req, res, next){
    const upload = uploader(
        `${req.user.name}`,
        ['image/jpeg', 'image/jpg', 'image/png', 'audio/mpeg', 'audio/mp4', 'video/mp4', 'video/mpeg'],
        100000000,
        'Only mp3, 3gp, mp4, .png .jpg $ .jpeg files are allowed'
    );

    upload.any()(req, res, (err) => {
        if(err){
            res.status(500).json({
                errors: {
                    avatar: {
                        message: err
                    }
                }
            })
        } else{
            next()
        }
    })
}


module.exports = {
    files,
}