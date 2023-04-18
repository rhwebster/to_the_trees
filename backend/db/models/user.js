'use strict';
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Listing, { foreignKey: "ownerId" });
      User.hasMany(models.Reservation, { foreignKey: "guestId" });
      User.hasMany(models.TreehouseReview, { foreignKey: "guestId" });
      User.hasMany(models.GuestReview, { foreignKey: "ownerId" });
      User.hasMany(models.GuestReview, { foreignKey: "guestId" });
      User.belongsToMany(models.Listing, { through: "Favorite", foreignKey: "userId", otherKey: "listingId" });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    profilePicUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    }
  });
  return User;
};