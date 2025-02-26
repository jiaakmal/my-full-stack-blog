import User from "../models/user.modal.js";
import { Webhook } from "svix";
import dotenv from "dotenv";

dotenv.config();

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ message: "Webhook secret needed!" });
  }

  const payload = req.body;
  const headers = req.headers;

  console.log("Payload:", payload);
  console.log("Headers:", headers);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.log("Webhook verification failed:", err);
    return res.status(400).json({ message: "Webhook verification failed!" });
  }

  console.log("Event data:", evt.data);

  if (evt.type === "user.created") {
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_image_url,
    });

    try {
      await newUser.save();
      console.log("User created:", newUser);
    } catch (err) {
      console.log("Error saving user:", err);
      return res.status(500).json({ message: "Error saving user", error: err.message });
    }
  }

  return res.status(200).json({ message: "Webhook received" });
};