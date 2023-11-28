const sequelize = require('../config/connection.js');
const seedUser = require('./UserData.js');
const seedWish = require('./WishlistData.js');
const seedComment = require('./CommentData.js');
const seedMovie = require('./MovieData.js');


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('Database Synced');
    await seedWish();

    await seedUser();

    await seedComment(); 

    await seedMovie();

    process.exit(0);
};

seedAll();
