"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  Transaction.init(
    {
      orderid: DataTypes.STRING,
      date: DataTypes.STRING,
      status: DataTypes.STRING,
      amount: DataTypes.STRING,
      mode: DataTypes.STRING,
      urn_no: DataTypes.STRING,
      Trans_date: DataTypes.STRING,
      user_id: DataTypes.STRING,
      opening_bal: DataTypes.STRING,
      closing_bal: DataTypes.STRING,
      name: DataTypes.STRING,
      account: DataTypes.STRING,
      ifsc: DataTypes.STRING,
      refundrefid: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
