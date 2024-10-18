"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  History.init(
    {
      user_id: DataTypes.STRING,
      opening_bal: DataTypes.STRING,
      closing_bal: DataTypes.STRING,
      amount: DataTypes.STRING,
      type: DataTypes.STRING,
      status: DataTypes.STRING,
      trans_id: DataTypes.STRING,
      trans_order_id: DataTypes.STRING,
      refundtransorderid: DataTypes.STRING,
      typename: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  return History;
};
