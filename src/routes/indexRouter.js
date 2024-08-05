const express = require("express");
const userRouter = require("./userRouter.js");
const foodRouter = require("./foodRouter.js");

const router = express.Router();

router.use(userRouter); // Correct usage
router.use(foodRouter);

module.exports = router;
