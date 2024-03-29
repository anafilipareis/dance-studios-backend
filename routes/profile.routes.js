const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
// const multer = require('../config/cloudinary.config');
const fileUploader = require('../config/cloudinary.config');

// isAuthenticated middleware is to protect the routes and ensures that only authenticated users 
// can access their private profile and update it.
// checks if a user is logged in.
const { isAuthenticated } = require('../middleware/jwt.middleware');



// Render private profile for authenticated users. "When someone goes to the '/profile' page, do the following:"
router.get('/', isAuthenticated, (req, res) => { //isAuthenticated ensures the user is logged in before showing their private profile.
  try {
    //  who the user is by looking at their unique identifier (ID) stored in the request.
    // This ID comes from JWT that was sent when the user logged in.
    console.log(req.payload)
    const userId = req.payload._id; 

    // Fetch user details from the database
    User.findById(userId)
      .select('-password') // We're making sure not to tell the user's password to anyone.
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
    const userId = req.payload._id; // Extract user ID from the JWT payload
    const { username, email, password, firstName, lastName, status } = req.body;
    let profilePictureUrl = null;

    // Check if a profile picture is uploaded
    if (req.file) {
      // Upload the profile picture to Cloudinary
      // const uploadedPicture = await fileUploader.upload(req.file.path);
      profilePictureUrl = req.file.path;
    }
    console.log(profilePictureUrl)

    // Construct the update object based on provided data
    const updateData = { username, email, password, firstName, lastName, status };
    // Add profile picture URL to the update object if it exists
    if (profilePictureUrl) {
      updateData.profilePictureUrl = profilePictureUrl;
    }

    // Update the user's information in the database
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



// // Update user profile. "If someone wants to update their profile, do the following:"
// router.put('/', isAuthenticated, (req, res) => {
//   try {
//     // We're finding out who the user is and getting the updated details they want to save.
//     const userId = req.payload._id; // Extract user ID from the JWT payload
//     const { username, email, password, firstName, lastName, status, profilePicture } = req.body;

//     // We're telling the database to find the user with a specific ID and update their information
//     User.findByIdAndUpdate(
//       userId,
//       { username, email, password, firstName, lastName, status, profilePicture },
//       { new: true } // ensures we get the updated user details in the response.
//     )
//       .select('-password') 
//       .exec((err, updatedUser) => {
//         if (err) {
//           console.error('Error updating user profile:', err);
//           return res.status(500).json({ message: 'Internal server error' });
//         }

//         // Render the updated user profile
//         res.json({ message: 'Profile updated successfully', user: updatedUser });
//       });
//   } catch (error) {
//     console.error('Error updating user profile:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// Render public profile for any username. "If someone wants to see another person's profile, do the following:"
router.get('/:id', (req, res) => {
  try {
    //We're finding out who the user is based on their username.
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

        // Render the public profile page with user details
        res.json({ user });
      });
  } catch (error) {
    console.error('Error fetching public user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;