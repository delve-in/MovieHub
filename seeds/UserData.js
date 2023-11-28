const User = require('../models/User')

const userData = [
    {
        username: 'Superman',
        email: 'bigs@flyingman.com',
        password: 'banana123',
    },
    {
        username: 'The Flash',
        email: 'Superfast@mail.com',
        password: 'elvis789',
    },

];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;