'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Listings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      address1: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      address2: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      address3: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lat: {
        type: Sequelize.FLOAT(10,6),
        allowNull: false,
      },
      lon: {
        type: Sequelize.FLOAT(10,6),
        allowNull: false,
      },
      picUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      maxGuests: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pricePerDay: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ccreatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Listings');
  }
};