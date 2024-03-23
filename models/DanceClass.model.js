const { Schema, model } = require("mongoose");

const danceClassSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    
      day: {
        type: String,
        required: [true, "Day is required."],
      },
      time: {
        type: String,
        required: [true, "Time is required."],
      },
  
    spotsLeft: {
      type: Number,
      default: 15, // maximum spots are 15
      min: 0,
      max: 15,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    video: {
      type: String, // path or URL of the video
    },
    pictures: [
      {
        type: String, // path or URL of each picture
      },
    ],
    // favorites: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User", 
    //   },
    // ],
    comments: [
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

const DanceClass = model("DanceClass", danceClassSchema);

module.exports = DanceClass;


// About the Teacher ? Is it too much ? 
