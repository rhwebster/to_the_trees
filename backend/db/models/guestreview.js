'use strict';
module.exports = (sequelize, DataTypes) => {
  const GuestReview = sequelize.define('GuestReview', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  GuestReview.associate = function (models) {
    GuestReview.belongsTo(models.User, { foreignKey: "guestId" });
    GuestReview.belongsTo(models.User, { foreignKey: "ownerId" });
  };
  return GuestReview;
};