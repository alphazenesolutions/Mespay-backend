"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Distributor_payouts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      account: {
        type: Sequelize.STRING,
      },
      ifsc: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      mode: {
        type: Sequelize.STRING,
      },
      orderid: {
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
    await queryInterface.dropTable("Distributor_payouts");
  },
};
