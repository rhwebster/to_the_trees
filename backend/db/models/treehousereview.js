'use strict';
module.exports = (sequelize, DataTypes) => {
  const TreehouseReview = sequelize.define('TreehouseReview', {
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
    listingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  TreehouseReview.associate = function (models) {
    TreehouseReview.belongsTo(models.User, { foreignKey: "guestId" });
    TreehouseReview.belongsTo(models.Listing, { foreignKey: "listingId" });
  };
  return TreehouseReview;
};