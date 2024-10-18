"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      merchant_ID: {
        type: Sequelize.STRING,
      },
      companyname: {
        type: Sequelize.STRING,
      },
      company_address: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      pan_no: {
        type: Sequelize.STRING,
      },
      aadhar_no: {
        type: Sequelize.STRING,
      },
      gst: {
        type: Sequelize.STRING,
      },
      address_url: {
        type: Sequelize.STRING,
      },
      id_url: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      balance: {
        type: Sequelize.STRING,
      },
      pg_balance: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.STRING,
      },
      charge: {
        type: Sequelize.STRING,
      },
      payout_charge: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      dis_id: {
        type: Sequelize.STRING,
      },
      dis_charge: {
        type: Sequelize.STRING,
      },
      code: {
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
    await queryInterface.dropTable("Users");
  },
};
