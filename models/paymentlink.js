"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PaymentLink.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  PaymentLink.init(
    {
      amount: DataTypes.STRING,
      phone: DataTypes.STRING,
      user_id: DataTypes.STRING,
      link_id: DataTypes.STRING,
      payment_link: DataTypes.STRING,
      status: DataTypes.STRING,
      paymentid: DataTypes.STRING,
      orderid: DataTypes.STRING,
      expiry_date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PaymentLink",
    }
  );
  return PaymentLink;
};
