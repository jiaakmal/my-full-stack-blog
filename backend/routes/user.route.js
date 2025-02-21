import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
res.status((200)).send('it is user route works');
})

export default router