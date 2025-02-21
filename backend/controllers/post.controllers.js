import User from "../models/post.modal.js"
import Post from "../models/post.modal.js"

export const getPosts = async (req,res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
}
export const getPost= async (req,res) => {
    const post = await Post.findOne({slug: req.params.slug});
    res.status(200).json(post);
}
export const createPost = async (req, res) => {
    // const clerkUserId = req.auth.clerkUserId;
    // console.log(req.headers);
    const clerkUserId = req.auth.userId

  console.log("clerkUserId:", clerkUserId);
  console.log("Headers:", req.headers);
  
    
  
    if (!clerkUserId) {
      return res.status(401).json("Not authenticated!");
    }
  
    const user = await User.findOne({ clerkUserId });
  
    if (!user) {
      return res.status(404).json("User not found!");
    }
  
    // let slug = req.body.title.replace(/ /g, "-").toLowerCase();
  
    // let existingPost = await Post.findOne({ slug });
  
    // let counter = 2;
  
    // while (existingPost) {
    //   slug = `${slug}-${counter}`;
    //   existingPost = await Post.findOne({ slug });
    //   counter++;
    // }
  
    const newPost = new Post({ user: user._id, ...req.body });
  
    const post = await newPost.save();
    res.status(200).json(post);
  };
export const deletePost= async (req,res) => {
    const post = await postModal.findByIdAndDelete({_id:req.params.id,user:user._id});
    res.status(200).json("post is deleted");
}