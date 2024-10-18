"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Distributor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Distributor.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      pan_no: DataTypes.STRING,
      aadhar_no: DataTypes.STRING,
      address_url: DataTypes.STRING,
      id_url: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
      balance: DataTypes.STRING,
      pg_balance: DataTypes.STRING,
      token: DataTypes.STRING,
      charge: DataTypes.STRING,
      payout_charge: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Distributor",
    }
  );
  return Distributor;
};
