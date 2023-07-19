import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    caption: String,
    image: {
        public_id: String,
        url: String,
    },
    owner: {
        type:  mongoose.Schema.ObjectId,
        ref: "User",
    },
    likes: [
        {
            type:  mongoose.Schema.ObjectId,
            ref: "User",
        }
    ],

    comments: [
        {
            user: {
                type:  mongoose.Schema.ObjectId,
                ref: "User",
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],

}, { timestamps: true })

const Post = mongoose.model("Post", postSchema)

export default Post;