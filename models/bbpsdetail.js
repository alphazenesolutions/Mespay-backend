"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BbpsDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        BbpsDetail.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  BbpsDetail.init(
    {
        billerid: DataTypes.STRING,
        billercategory: DataTypes.STRING,
        billercatname: DataTypes.STRING,
        billername: DataTypes.STRING,
        skey: DataTypes.STRING,
        billerdetails: DataTypes.JSON,
        paramdetails: DataTypes.JSON,
        orderid: DataTypes.STRING,
        amount: DataTypes.STRING,
        user_id: DataTypes.STRING,
        status: DataTypes.STRING,
        transactionid: DataTypes.STRING,
        apiresponse: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BbpsDetail",
    }
  );
  return BbpsDetail;
};
