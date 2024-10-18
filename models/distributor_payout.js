"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Distributor_payout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Distributor_payout.init(
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
      modelName: "Distributor_payout",
    }
  );
  return Distributor_payout;
};
