"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Distributor_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Distributor_transaction.init(
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
    },
    {
      sequelize,
      modelName: "Distributor_transaction",
    }
  );
  return Distributor_transaction;
};
