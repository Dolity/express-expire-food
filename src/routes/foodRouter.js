const express = require("express");

const foodController = require("../controllers/food/foodController.js");
const auth = require("../middlewares/authToken.js")


const foodRouter = express.Router();

foodRouter.get("/food/health", foodController.getFoodHealth);

foodRouter.post("/food-add", foodController.postFoodAdd);

foodRouter.get("/foods", foodController.getFoods);

foodRouter.put("/food-update/:id", foodController.putFoodUpdate);

foodRouter.delete("/food-delete/:id", foodController.deleteFood);

module.exports = foodRouter;
