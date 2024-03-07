const { Schema, model } = require("mongoose");

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
    profilePicture: {
      type: String, // Path or URL of the profile picture
    },
    favouriteClasses: [
      {
        type: Schema.Types.ObjectId,
        ref: "DanceClass", // DanceClass model
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment", // Comment model
      },
    ],
    favoriteComments: [ // Users can like comments, and the total likes count will be stored in the Comment model.
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
