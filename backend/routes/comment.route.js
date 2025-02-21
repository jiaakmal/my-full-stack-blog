import express from "express"
const router = express.Router();

router.get("/anothertest", (req, res) => {
    res.status((200)).send('it is post route works');
})

export default router
