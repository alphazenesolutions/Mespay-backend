"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Paymenthistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Paymenthistory.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  Paymenthistory.init(
    {
      amount: DataTypes.STRING,
      distributoramount: DataTypes.STRING,
      orderid: DataTypes.STRING,
      user_id: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Paymenthistory",
    }
  );
  return Paymenthistory;
};
