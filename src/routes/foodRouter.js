const express = require("express");

const foodController = require("../controllers/food/foodController.js");
const auth = require("../middlewares/authToken.js")


const foodRouter = express.Router();

foodRouter.get("/food/health", foodController.getFoodHealth);

foodRouter.post("/food-add", foodController.postFoodAdd);

foodRouter.get("/foods", foodController.getFoods);

module.exports = foodRouter;
