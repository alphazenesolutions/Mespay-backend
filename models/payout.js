"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payout.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  Payout.init(
    {
      name: DataTypes.STRING,
      account: DataTypes.STRING,
      ifsc: DataTypes.STRING,
      amount: DataTypes.STRING,
      user_id: DataTypes.STRING,
      status: DataTypes.STRING,
      mode: DataTypes.STRING,
      orderid: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payout",
    }
  );
  return Payout;
};
