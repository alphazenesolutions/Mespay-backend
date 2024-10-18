"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recharge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Recharge.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  Recharge.init(
    {
        phone: DataTypes.STRING,
        user_id: DataTypes.STRING,
        amount: DataTypes.STRING,
        status: DataTypes.STRING,
        orderid: DataTypes.STRING,
        operator_id: DataTypes.STRING,
        operator_name: DataTypes.STRING,
        circle: DataTypes.STRING,
        apiresponse: DataTypes.STRING,
        transactionid: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Recharge",
    }
  );
  return Recharge;
};
