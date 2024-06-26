const { Schema, model } = require("mongoose");
const fileUploader = require('../config/cloudinary.config');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    status: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },
    profilePictureUrl: {
      type: String, 
    },
    // favouriteClasses: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "DanceClass", // DanceClass model
    //   },
    // ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment", // Comment model
      },
    ],
   
  },
  {
    timestamps: true,
  }
);


userSchema.pre('save', async function(next) {
  if (this.isModified('profilePicture')) {
    try {
   
      const uploadedPicture = await fileUploader.upload(this.profilePicture);
      this.profilePictureUrl = uploadedPicture.secure_url;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  }
  next();
});

const User = model("User", userSchema);

module.exports = User;
