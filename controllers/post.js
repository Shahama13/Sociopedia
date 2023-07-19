import Post from "../models/Post.js"
import User from "../models/User.js"
import cloudinary from "cloudinary"


export const createPost = async (req, res) => {
    try {

        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "posts"
        })
        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            owner: req.user._id
        }
        const post = await Post.create(newPostData)
        const user = await User.findById(req.user._id);

        user.posts.unshift(post._id);
        await user.save()

        res.status(201).json({
            success: true,
            post,
            message: "Post created"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const likeUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ success: false, message: "Post not Found" })
        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id)
            post.likes.splice(index, 1)
            await post.save();
            res.status(200).json({
                success: true,
                message: "Post Unliked"
            })
        }
        else {
            post.likes.push(req.user._id);
            await post.save()
            res.status(200).json({
                success: true,
                message: "Post Liked"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ success: false, message: "Post not Found" })

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            })
        }

        await cloudinary.v2.uploader.destroy(post.image.public_id)

        const user = await User.findById(req.user._id)
        const index = user.posts.indexOf(req.params.id)
        user.posts.splice(index, 1);
        await user.save();

        await post.deleteOne();

        res.status(200).json({
            success: true,
            message: "Post deleted"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getPostOfFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        const posts = await Post.find({
            owner: {
                $in: user.following
            }
        })
            .populate("owner likes comments.user")

        res.status(200).json({
            success: true,
            posts: posts.reverse()
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateCaption = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ success: false, message: "Post not Found" })
        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ success: false, message: "Unauthorized access" })
        }
        post.caption = req.body.caption;
        await post.save()
        res.status(200).json({
            success: true,
            message: "Post Updated",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const commentOnPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ success: false, message: "Post not Found" })
        let commentExists = -1;
        post.comments.forEach((item, index) => {
            if (item.user.toString() === req.user._id.toString()) {
                commentExists = index;
            }
        })

        if (commentExists !== -1) {
            post.comments[commentExists].comment = req.body.comment;
            await post.save()
            return res.status(200).json({
                success: true,
                message: "Comment updated"
            })
        }
        else {
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment
            });
            await post.save()
            return res.status(200).json({
                success: true,
                message: "Comment added"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ success: false, message: "Post not Found" })
     
        // deleteing comment s a post owner
        if (post.owner.toString() === req.user._id.toString()) {

           const {commentId}= req.body
            post.comments.forEach((item, index) => {
                if (item._id.toString() === commentId.toString()) {
                    return post.comments.splice(index, 1)
                }
            });
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Selected Comment deleted"
            })
        }
        // else if (post.owner.toString() !== req.user._id.toString()) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Unauthorized access"
        //     })
        // }
        // deleting comment as a user
        else {
            post.comments.forEach((item, index) => {
                if (item.user.toString() === req.user._id.toString()) {
                    return post.comments.splice(index, 1)
                }
            });
            res.status(200).json({
                success: true,
                message: "Comment deleted"
            })
            await post.save()
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const getLikesOfPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("likes comments.user")
        res.status(200).json({
            success: true,
            post,
            commentCount: post.comments.length
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


