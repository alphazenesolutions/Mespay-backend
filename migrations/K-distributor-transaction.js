"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Distributor_transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderid: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.STRING,
      },
      mode: {
        type: Sequelize.STRING,
      },
      urn_no: {
        type: Sequelize.STRING,
      },
      Trans_date: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      opening_bal: {
        type: Sequelize.STRING,
      },
      closing_bal: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Distributor_transactions");
  },
};
