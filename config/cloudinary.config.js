const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config({path:__dirname+'/../.env'})
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
 
const storage = new CloudinaryStorage({
 
  cloudinary,
  params: {
    allowed_formats: ['jpg', 'png'],
    folder: 'DanceKingdom', 
    transformation: [{ width: 500, height: 500, crop: 'limit' }] 
    
  }
});
const fileUploader = multer({ storage });
 module.exports = fileUploader



// storage: storage
// module.exports = multer({ storage });