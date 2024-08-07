const { Food } = require("../../models");
const logger = require("../../helpers/logger");

const getFoodHealth = (req, res) => {
  return res.status(200).json({ status: "Food service is healthy!" });
};

const postFoodAdd = async (req, res) => {
  const { name, category, mfgDate, expDate } = req.body;

  try {
    const foodResult = await Food.create({
      name: name,
      category: category,
      manufacture_date: mfgDate,
      expiration_date: expDate,
    });
  
    return res
      .status(201)
      .json({ message: "Food is added successfully!", result: foodResult });
  } catch (error) {
    return console.log("Server Internal Error", error);
    
  }
};

const putFoodUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, category, mfgDate, expDate } = req.body;

  try {
    const foodResult = await Food.update(
      {
        name: name,
        category: category,
        manufacture_date: mfgDate,
        expiration_date: expDate,
      },
      {
        where: {
          id: id,
        },
      }
    );
  
    return res
      .status(200)
      .json({ message: "Food is updated successfully.", result: foodResult });
  } catch (error) {
    return console.log("Server Internal Error", error);
  }
};

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const foodResult = await Food.destroy({
      where: {
        id: id,
      },
    });

    return res
      .status(200)
      .json({ message: "Food is deleted successfully.", result: foodResult });
  } catch (error) {
    return console.log("Server Internal Error", error);
  }
};

const getFoods = async (req, res) => {
  try {
    const foodResult = await Food.findAll();

    return  res.status(200).json({ result: foodResult });
  } catch (error) {
    return console.log("Server Internal Error", error);
  }
};

module.exports = {
  getFoodHealth,
  postFoodAdd,
  getFoods,
  putFoodUpdate,
  deleteFood,
};
