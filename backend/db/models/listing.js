'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Listing.belongsTo(models.User, { foreignKey: "ownerId" });
      Listing.hasMany(models.Image, { foreignKey: "listingId" });
      Listing.belongsToMany(models.User, { through: "Reservation", foreignKey: "listingId", otherKey: "guestId" });
      Listing.belongsToMany(models.User, { through: "TreehouseReview", foreignKey: "listingId", otherKey: "guestId" });
      Listing.belongsToMany(models.User, { through: "Favorite", foreignKey: "listingId", otherKey: "userId" });
    }
  }
  Listing.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    maxGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pricePerNight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lat: {
      type: DataTypes.INTEGER,
    },
    lon: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Listing',
  });
  return Listing;
};