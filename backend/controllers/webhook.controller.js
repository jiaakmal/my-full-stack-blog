import User from "../models/user.modal.js";
import Post from "../models/post.modal.js";
import Comment from "../models/comment.modal.js";
import { Webhook } from "svix";
import dotenv from "dotenv";
dotenv.config();

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed!");
  }

  const payload = req.body;
  const headers = req.headers;
  console.log("payload",payload);
  console.log("headers",headers)

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    return res.status(400).json({
      message: "Webhook verification failed!",
    });
  }

  console.log(evt.data);

  if (evt.type === "user.created") {
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_img_url,
    });

    try {
      await newUser.save();
      console.log("User created:", newUser);
    } catch (err) {
      return res.status(500).json({
        message: "Error saving user",
        error: err.message,
      });
    }
  }

  if (evt.type === "user.deleted") {
    try {
      const deletedUser = await User.findOneAndDelete({
        clerkUserId: evt.data.id,
      });

      if (deletedUser) {
        await Post.deleteMany({ user: deletedUser._id });
        await Comment.deleteMany({ user: deletedUser._id });
        console.log("User and related posts/comments deleted:", deletedUser);
      }
    } catch (err) {
      return res.status(500).json({
        message: "Error deleting user",
        error: err.message,
      });
    }
  }

  return res.status(200).json({
    message: "Webhook received",
  });
};