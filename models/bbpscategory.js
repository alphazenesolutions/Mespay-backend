"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BbpsCategory extends Model { 
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //     BbpsCategory.belongsTo(models.User, {
    //     foreignKey: "user_id",
    //     onDelete: "CASCADE",
    //   });
    }
  }
  BbpsCategory.init(
    {
      key: DataTypes.STRING,
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BbpsCategory",
    }
  );
  return BbpsCategory;
};
