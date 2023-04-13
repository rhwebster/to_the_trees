'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Users';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, [
    {
      name: 'Barney Stinson',
      profilePicUrl: null,
      email: 'barney@awesome.com',
      hashedPassword: bcrypt.hashSync('suitUp')
    },
    {
      name: 'Jason Mendoza',
      profilePicUrl: null,
      email: 'jmoney@bortlesfans.com',
      hashedPassword: bcrypt.hashSync('bortles')
    },
    {
      name: 'Serena Van Der Woodsen',
      profilePicUrl: null,
      email: 'svdw@gossipgirl.com',
      hashedPassword: bcrypt.hashSync('danornate')
    },
    {
      name: 'Joe Exotic',
      profilePicUrl: null,
      email: 'joe@tigerking.com',
      hashedPassword: bcrypt.hashSync('caroldidit')
    },
    {
      name: 'Chandler Bing',
      profilePicUrl: null,
      email: 'chandler@bing.com',
      hashedPassword: bcrypt.hashSync('monicajoeyrachelrossphoebe')
    },
    {
      name: 'Walter White',
      profilePicUrl: null,
      email: 'heizenburg@lospolloshermanos.com',
      hashedPassword: bcrypt.hashSync('saymyname')
    },
    {
      name: 'Eric Taylor',
      profilePicUrl: null,
      email: 'etaylor@eastdillon.edu',
      hashedPassword: bcrypt.hashSync('tammyjuliegrace')
    },
    {
      name: 'Troy Barnes',
      profilePicUrl: null,
      email: 'troy@gcc.edu',
      hashedPassword: bcrypt.hashSync('poppop')
    },
    {
      name: 'Tyrion Lannister',
      profilePicUrl: null,
      email: 'tyrion@thelannisters.org',
      hashedPassword: bcrypt.hashSync('drinkandknowthings')
    },
    {
      name: 'Michael Scott',
      profilePicUrl: null,
      email: 'mscott@dundermifflin.com',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      name: 'Pete Nelson',
      profilePicUrl: null,
      email: 'pete@nelson.inc',
      hashedPassword: bcrypt.hashSync('treehousepoint')
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      email: { [Op.in]: ['barney@awesome.com', 'jmoney@bortlesfans.com', 'svdw@gossipgirl.com',
      'joe@tigerking.com', 'chandler@bing.com', 'heizenburg@lospolloshermanos.com', 'etaylor@eastdillon.edu',
      'troy@gcc.edu', 'tyrion@thelannisters.org', 'mscott@dundermifflin.com', 'pete@nelson.inc'] }
    }, {});
  }
};
