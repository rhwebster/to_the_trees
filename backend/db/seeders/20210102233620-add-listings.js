'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Listings', [
      {
        name: 'Temple of Blue Moon',
        address1: '6922 Preston-Fall City Rd SE',
        address3: 'Issaquah, WA 98027',
        lat: 47.54,
        lon: -121.91,
        ownerId: 34,
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
        ownerId: 34,
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
        ownerId: 34,
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
        ownerId: 34,
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
        ownerId: 34,
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
        ownerId: 34,
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
        ownerId: 34,
        description: '250 sq ft treehouse with stairs leading to 2 lofts with beds overlooking the most gorgeous view of the Silicon Valley.',
        maxGuests: 4,
        pricePerDay: 350,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Listings', null, {});
  }
};