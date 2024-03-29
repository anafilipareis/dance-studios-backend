const express = require('express');
const router = express.Router();
const User = require('../models/User.model');

const fileUploader = require('../config/cloudinary.config');


const { isAuthenticated } = require('../middleware/jwt.middleware');



// Render private profile for authenticated users. "When someone goes to the '/profile' page, do the following:"
router.get('/', isAuthenticated, (req, res) => { 
  try {
 
    console.log(req.payload)
    const userId = req.payload._id; 

   
    User.findById(userId)
      .select('-password') 
      .exec((err, user) => {
        if (err) {
          console.error('Error fetching user profile:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Render the private profile page with user details
        res.json({ user });
      });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/', isAuthenticated, fileUploader.single("profilePicture"), async (req, res) => {
  try {
    const userId = req.payload._id; 
    const { username, email, password, firstName, lastName, status } = req.body;
    let profilePictureUrl = null;

    if (req.file) {
   
      profilePictureUrl = req.file.path;
    }
    console.log(profilePictureUrl)

   
    const updateData = { username, email, password, firstName, lastName, status };
 
    if (profilePictureUrl) {
      updateData.profilePictureUrl = profilePictureUrl;
    }

   
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





router.get('/:id', (req, res) => {
  try {
    
    const id = req.params.id;

    User.findById(id)
      .select('-password') 
      .exec((err, user) => {
        if (err) {
          console.error('Error fetching public user profile:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        
        res.json({ user });
      });
  } catch (error) {
    console.error('Error fetching public user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;