'use strict';

'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoUsers = await queryInterface.bulkInsert('Users', [
      {
        name: 'Barney Stinson',
        address1: '1550 1st Ave',
        address2: 'Apt 629',
        address3: 'New York, NY 10028',
        username: 'bstinson',
        email: 'barney@awesome.com',
        hashedPassword: await bcrypt.hash('suitup', 10)
      },
      {
        name: 'Jason Mendoza',
        address1: '1 Bortles Way',
        address3: 'Good Place, Heaven, 12358',
        username: 'bortlesfan5',
        email: 'jmoney@bortlesfans.com',
        hashedPassword: await bcrypt.hash('bortles', 10)
      },
      {
        name: 'Serena Van Der Woodsen',
        address1: '1136 5th Ave',
        address2: 'Penthouse',
        address3: 'New York, NY 10128',
        username: 'gossipgirl',
        email: 'svdw@gossipgirl.com',
        hashedPassword: await bcrypt.hash('danornate', 10)
      },
      {
        name: 'Joe Exotic',
        address1: '25803 N County Rd 3250',
        address3: 'Wynnwood, OK 73098',
        username: 'tigerking',
        email: 'joe@tigerking.com',
        hashedPassword: await bcrypt.hash('caroldidit', 10)
      },
      {
        name: 'Chandler Bing',
        address1: '90 Bedford St',
        address2: 'Apt 19',
        address3: 'New York, NY 10014',
        username: 'cbing',
        email: 'chandler@bing.com',
        hashedPassword: await bcrypt.hash('monicajoeyrachelrossphoebe', 10)
      },
      {
        name: 'Walter White',
        address1: '308 Negra Arroyo Ln',
        address3: 'Albuquerque, NM 87111',
        username: 'heizenburg',
        email: 'heizenburg@lospolloshermanos.com',
        hashedPassword: await bcrypt.hash('saymyname', 10)
      },
      {
        name: 'Eric Taylor',
        address1: '13084 E 42nd St',
        address3: 'Dillon, TX 79762',
        username: 'coach',
        email: 'etaylor@eastdillon.edu',
        hashedPassword: await bcrypt.hash('tammyjuliegrace', 10)
      },
      {
        name: 'Troy Barnes',
        address1: '1 Main St',
        address2: 'Guzman Hall #44',
        address3: 'Greendale, CO 80918',
        username: 'troyandabedinthemorning',
        email: 'troy@gcc.edu',
        hashedPassword: await bcrypt.hash('poppop', 10)
      },
      {
        name: 'Tyrion Lannister',
        address1: '1 Red Keep',
        address3: 'Kings Landing, Westeros, 20419',
        username: 'masterofcoin',
        email: 'tyrion@thelannisters.org',
        hashedPassword: await bcrypt.hash('drinkandknowthings', 10)
      },
      {
        name: 'Michael Scott',
        address1: '1128 Lafayette St',
        address3: 'Scranton, PA, 18504',
        username: 'username',
        email: 'mscott@dundermifflin.com',
        hashedPassword: await bcrypt.hash('password', 10)
      },
      {
        name: 'Pete Nelson',
        address1: '6922 Preston-Fall City Rd SE',
        address3: 'Issaquah, WA, 98027',
        username: 'treehousemaster',
        email: 'pete@nelson.inc',
        hashedPassword: await bcrypt.hash('treehousepoint', 10)
      },
    ], { returning: true });

    const pete = demoUsers[10].id

    const demoListings = queryInterface.bulkInsert('Listings', [
      {
        name: 'Temple of Blue Moon',
        address1: '6922 Preston-Fall City Rd SE',
        address3: 'Issaquah, WA 98027',
        lat: 47.54,
        lon: -121.91,
        ownerId: pete,
        description: 'Our first built treehouse at Treehouse Point',
        maxGuests: 4,
        pricePerDay: 295,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bonbibi',
        address1: '6922 Preston-Fall City Rd SE',
        address3: 'Issaquah, WA 98027',
        lat: 47.54,
        lon: -121.91,
        ownerId: pete,
        description: 'tucked into the large pines of Issaquah, it is our most cozy spot',
        maxGuests: 2,
        pricePerDay: 275,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Burl',
        address1: '6922 Preston-Fall City Rd SE',
        address3: 'Issaquah, WA 98027',
        lat: 47.54,
        lon: -121.91,
        ownerId: pete,
        description: "I don't play favorites, but this is my favorite",
        maxGuests: 4,
        pricePerDay: 405,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Angry Orchard Treehouse',
        address1: '2241 Albany Post Road',
        address3: 'Walden, NY 12586',
        lat: 41.59,
        lon: -74.22,
        ownerId: pete,
        description: 'The taproom with the best view',
        maxGuests: 12,
        pricePerDay: 675,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Single Spruce Tree Home',
        address1: '2503 Haworth Ave',
        address3: 'Newberg, OR, 97132',
        lat: 45.31,
        lon: -121.95,
        ownerId: pete,
        description: "Seaside views from the limbs of a gargantuan Sitka spruce, and a cozy treehouse with everything you'd need in a home",
        maxGuests: 4,
        pricePerDay: 285,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Montana Treehouse Retreat',
        address1: '2215 Dillon Rd',
        address3: 'Columbia Falls, MT, 59912',
        lat: 48.37,
        lon: -114.28,
        ownerId: pete,
        description: 'Take your fantasy of living in a cabin in the woods to new heights with a stay at this stunning, two-story treehouse retreat at the gateway to Glacier National Park in Montana',
        maxGuests: 4,
        pricePerDay: 510,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Treehouse, San Jose',
        address1: '11140 Mt Hamilton Rd',
        address3: 'Mt Hamilton, CA, 95140 ',
        lat: 37.38,
        lon: -121.81,
        ownerId: pete,
        description: '250 sq ft treehouse with stairs leading to 2 lofts with beds overlooking the most gorgeous view of the Silicon Valley.',
        maxGuests: 4,
        pricePerDay: 350,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], { returning: true })
  },


  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Listings', null, {});

  }
};
