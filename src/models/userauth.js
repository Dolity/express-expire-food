"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserAuth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserAuth.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  UserAuth.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      auth_provider: DataTypes.STRING,
      password_reset_token: DataTypes.STRING,
      last_login: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserAuth",
    }
  );
  return UserAuth;
};
