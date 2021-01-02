'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    numGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    listingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Reservation.associate = function (models) {
    Reservation.belongsTo(models.User, { foreignKey: "guestId" });
    Reservation.belongsTo(models.Listing, { foreignKey: "listingId" });
  };
  return Reservation;
};