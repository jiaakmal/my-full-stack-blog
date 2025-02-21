import express from "express"
import { getPosts,getPost , createPost,deletePost} from "../controllers/post.controllers.js";
import { requireAuth } from "@clerk/express";
const router = express.Router();


router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/",createPost);
router.delete("/:id", deletePost);


export default router
