'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    listingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING(15),
    }
  }, {});
  Reservation.associate = function (models) {
    Reservation.belongsTo(models.User, { foreignKey: "guestId" });
    Reservation.belongsTo(models.Listing, { foreignKey: "listingId" });
  };
  return Reservation;
};