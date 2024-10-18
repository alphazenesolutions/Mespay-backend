"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.PaymentLink, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      merchant_ID: DataTypes.STRING,
      companyname: DataTypes.STRING,
      company_address: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      pan_no: DataTypes.STRING,
      aadhar_no: DataTypes.STRING,
      gst: DataTypes.STRING,
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
      dis_id: DataTypes.STRING,
      dis_charge: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
