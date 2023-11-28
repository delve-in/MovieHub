const Wishlist = require('../models/Wishlist');

const wishData = [
    {
        movie_id: 3,
        user_id: 2
    },
    {
        movie_id: 3,
        user_id: 1
    },
];

const seedwish = () => Wishlist.bulkCreate(wishData);

module.exports = seedwish;