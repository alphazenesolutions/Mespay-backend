"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PaymentLinks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
          as: "user_id",
        },
      },
      link_id: {
        type: Sequelize.STRING,
      },
      payment_link: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      paymentid: {
        type: Sequelize.STRING,
      },
      orderid: {
        type: Sequelize.STRING,
      },
      expiry_date: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PaymentLinks");
  },
};
