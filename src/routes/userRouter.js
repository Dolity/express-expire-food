const express = require("express");
//express-validate
const { body } = require("express-validator");


const userController = require("../controllers/user/userController.js");
const auth = require("../middlewares/authToken.js")

const userRouter = express.Router();

userRouter.get("/user/health", auth, userController.getUserHealth);

userRouter.post("/user-register",
    [
        body("email").isEmail().withMessage("Email is not valid"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ], userController.postUserRegister);

userRouter.post("/user-login",
    [
        body("email").isEmail().withMessage("Email is not valid"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ], userController.getUserLogin);

userRouter.get("/user-profile", userController.getUserProfile);

userRouter.put("/user-profile", userController.putUserProfile);

module.exports = userRouter;
