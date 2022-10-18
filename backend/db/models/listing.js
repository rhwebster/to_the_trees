'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT(10,6),
      allowNull: false,
    },
    lon: {
      type: DataTypes.FLOAT(10,6),
      allowNull: false,
    },
    picUrl: {
      type: DataTypes.STRING,
      allowNull: true,
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
    pricePerDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Listing.associate = function (models) {
    Listing.belongsTo(models.User, { foreignKey: "ownerId" });
    Listing.hasMany(models.Image, { foreignKey: "listingId" });
    Listing.belongsToMany(models.User, { through: "Reservation", foreignKey: "listingId", otherKey: "userId" });
    Listing.belongsToMany(models.User, { through: "TreehouseReview", foreignKey: "listingId", otherKey: "userId" });
    Listing.belongsToMany(models.User, { through: "Favorite", foreignKey: "listingId", otherKey: "userId" });
  };
  return Listing;
};