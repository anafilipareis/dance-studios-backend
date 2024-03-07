const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Comment text is required."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // User who posted the comment
      required: true,
    },
    danceClass: {
      type: Schema.Types.ObjectId,
      ref: "DanceClass", // The dance class that the user is commenting on
      required: true,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment", // Reference to the parent comment for replies
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment", // Reply comments
      },
    ],
    // favorites: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User", // Users who favorited the comment
    //   },
    // ],

    // We only need the total number of likes for each comment. 
    likesCount: {
        type: Number,
        default: 0,
      },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;