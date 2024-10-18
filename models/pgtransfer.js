"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PgTransfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PgTransfer.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  PgTransfer.init(
    {
      date: DataTypes.STRING,
      amount: DataTypes.STRING,
      opening_bal: DataTypes.STRING,
      closing_bal: DataTypes.STRING,
      user_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PgTransfer",
    }
  );
  return PgTransfer;
};
