import Post from "../models/Post.js";
import User from "../models/User.js";
import crypto from "crypto"
import sendEmail from "../middleware/sendEmail.js";
import cloudinary from "cloudinary"

export const register = async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ success: false, message: "User already exists" })

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars"
        })

        user = await User.create({
            name,
            email,
            password,
            avatar: { public_id: myCloud.public_id, url: myCloud.secure_url }
        })
        const token = await user.generateToken();
        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }).json({
            success: true,
            user,
            token,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password").populate("followers following posts")
        if (!user) return res.status(400).json({ success: false, message: "User does not exist" })
        const isMatch = await user.matchPassword(password)
        if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect email or password" })
        const token = await user.generateToken();
        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }).json({
            success: true,
            user,
            message: "Logged in successfully",
            token,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        }).json({
            success: true,
            message: "User Logged Out"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const followUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id)
        const loggedInUser = await User.findById(req.user._id)

        if (!userToFollow) return res.status(404).json({ success: false, message: "User Not Found" })

        if (loggedInUser.following.includes(userToFollow._id)) {

            const indexFollowing = loggedInUser.following.indexOf(userToFollow._id)
            loggedInUser.following.splice(indexFollowing, 1)

            const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id)
            userToFollow.followers.splice(indexFollowers, 1);

            await loggedInUser.save()
            await userToFollow.save()

            res.status(400).json({
                success: true,
                message: `Unfollowed ${userToFollow.name}`
            })
        }

        else {
            loggedInUser.following.push(userToFollow._id)
            userToFollow.followers.push(loggedInUser._id)

            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({
                success: true,
                message: `Followed ${userToFollow.name}`
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) return res.status(400).json({ success: false, message: "Enter Old and New password" })
        const isMatch = await user.matchPassword(oldPassword);
        if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect old password" })
        user.password = newPassword
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password Updated"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { name, email, avatar } = req.body;

        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (avatar) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id)
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "avatars"
            })
            user.avatar.public_id = await myCloud.public_id,
                user.avatar.url = await myCloud.secure_url
        }
        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile Updated"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// BUG HERE
export const deleteMyProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id)
        console.log(user)
        const posts = user.posts
        const userid = user._id;
        console.log("UserID:", userid);

        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        await user.deleteOne();

        // logout user after deleting his profile
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        const allUser = await User.find()
        console.log(allUser)
        for (let i = 0; i < allUser.length; i++) {
            const user = await User.findById(allUser[i]._id);
            console.log("here")
            // Remove userid from followers array
            user.followers = await user.followers.filter(follower => follower.toString() !== userid.toString());
            console.log("here2")

            // Remove userid from following array
            user.following = await user.following.filter(following => following.toString() !== userid.toString());
            console.log("here3")

            await user.save();
        }


        const allpost = await Post.find();
        console.log(allpost)
        for (let i = 0; i < allpost.length; i++) {
            const post = await Post.findById(allpost[i]._id);
            console.log("Post ID:", post._id);

            // Remove comments with matching userid
            post.comments = await post.comments.filter(comment => comment.user.toString() !== userid.toString());
            console.log("Filtered comments:", post.comments);

            // Remove likes with matching userid
            post.likes = await post.likes.filter(like => like.toString() !== userid.toString());
            console.log("Filtered likes:", post.likes);

            await post.save();
        }


        // deleting user Post
        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i])
            console.log("here4")
            await cloudinary.v2.uploader.destroy(post.image.public_id)

            console.log("here5")
            await post.deleteOne()
        }


        res.status(200).json({
            success: true,
            message: "Your account has been deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("posts followers following")

        res.status(200).json({
            success: true,
            user,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {

       const users = await User.find({ name: { $regex: req.query.name, $options: "i" } });

        res.status(200).json({
            success: true,
            users,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const forgotpassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).json({ success: false, message: "User not found" })

        // this will get you a rest password token which you will send in email
        const resetpasswordToken = user.getResetPasswordToken()

        await user.save({ validateBeforeSave: false });

        const resetUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetpasswordToken}`
        const message = `your password reset token is: \n\n ${resetUrl}\n\n `

        try {

            await sendEmail({
                email: user.email,
                subject: "Sociopedia Password Recovery",
                message,
            })

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email}`
            })


        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save({ validateBeforeSave: false })

            res.status(500).json({
                success: false,
                message: error.message
            })

        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// RESET PASSWORD AFTER EMAIL
export const resetPassword = async (req, res) => {


    try {
        // creating token hash
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex")

        const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })
        if (!user) return res.status(401).json({ success: false, message: "Invalid or Expired Token " })

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        res.status(200).json({
            success: true,
            message: "Password Reset Successfull"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const getallMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const posts = [];
        for (let i = 0; i < user.posts.length; i++) {
            const post = await Post.findById(user.posts[i]).populate("owner likes comments.user")
            posts.push(post)
        }
        res.status(200).json({
            success: true,
            posts
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getUserPosts = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const posts = [];
        for (let i = 0; i < user.posts.length; i++) {
            const post = await Post.findById(user.posts[i]).populate("owner likes comments.user")
            posts.push(post)
        }
        res.status(200).json({
            success: true,
            posts,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("posts followers following")
        if (!user) return res.status(400).json({ success: false, message: "User does not exist" })

        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
