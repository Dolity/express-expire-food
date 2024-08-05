require("dotenv").config();

const { validationResult } = require("express-validator");

const { User, UserAuth } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const getUserHealth = (req, res) => {
  return res.status(200).json({ status: "User service is healthy!" });
};

const postUserRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
    });

    await UserAuth.create({
      user_id: newUser.id,
      password: hashedPassword,
    })

    return res.status(201).json({ message: "User is registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!", error: error });
  }

};

const getUserLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: UserAuth,
          as: "user_auth",
          attributes: ["password"]
        }
      ]
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.user_auth.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1d"
    })

    return res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!", error: error });
  }

};

const getUserProfile = (req, res) => {
  const { email } = req.body;
  const user = users.find((user) => user.email === email);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found!" });
  }
};

const putUserProfile = (req, res) => {
  const { email } = req.body;
  const user = users.find((user) => user.email === email);
  if (user) {
    user.email = req.body.email;
    user.password = req.body.password;
    res.status(200).json({ message: "User is updated successfully!" });
  } else {
    res.status(404).json({ message: "User not found!" });
  }
};

module.exports = {
  getUserHealth,
  postUserRegister,
  getUserLogin,
  getUserProfile,
  putUserProfile,
};
