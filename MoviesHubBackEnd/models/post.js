const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    release_date: {
        type: String,
        required: true,
    },
    moviePoster: {
        type: String,
        required: true,
    },
    reviews: {
        type: Number,
        required: true,
    },
    upvote: {
        type: Number,
        required: true,
    },
    downvote: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Post", postSchema);
