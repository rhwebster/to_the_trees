'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GuestReviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      guestId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'User' }
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'User' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GuestReviews');
  }
};