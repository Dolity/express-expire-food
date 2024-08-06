const { Food } = require("../../models");
const logger = require("../../helpers/logger");

const getFoodHealth = (req, res) => {
  res.status(200).json({ status: "Food service is healthy!" });
};

const postFoodAdd = async (req, res) => {
  const { name, category, mfgDate, expDate } = req.body;
  
  const foodResult = await Food.create({
    name: name,
    category: category,
    manufacture_date: mfgDate,
    expiration_date: expDate,
  });

  res
    .status(201)
    .json({ message: "Food is added successfully!", result: foodResult });
};

const getFoods = async (req, res) => {
  const foodResult = await Food.findAll();

  res.status(200).json({ result: foodResult });
};

module.exports = {
  getFoodHealth,
  postFoodAdd,
  getFoods,
};
