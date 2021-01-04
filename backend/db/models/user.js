'use strict';
const bcrypt = require('bcryptjs');
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address1: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    address3: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    profilePicUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] },
        },
        loginUser: {
          attributes: {},
        },
      },
    });
  User.associate = function (models) {
    User.hasMany(models.Listing, { foreignKey: "ownerId" });
    User.hasMany(models.Reservation, { foreignKey: "guestId" });
    User.hasMany(models.TreehouseReview, { foreignKey: "guestId" });
    User.hasMany(models.GuestReview, { foreignKey: "ownerId" });
    User.hasMany(models.GuestReview, { foreignKey: "guestId" });
    User.belongsToMany(models.Listing, { through: "Favorite", foreignKey: "userId", otherKey: "listingId" });
  };

  User.prototype.toSafeObject = function () { // remember, this cannot be an arrow function
    const { id, username, email, firstName, lastName, address1, address3 } = this; // context will be the User instance
    return { id, username, email, firstName , lastName, address1, address3 };
  };
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
  User.signup = async function ({
    firstName,
    lastName,
    address1,
    address3,
    username,
    email,
    password
   }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      address1,
      address3,
      username,
      email,
      hashedPassword
    });
    console.error('lastname:', lastName);
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};