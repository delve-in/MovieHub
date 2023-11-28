const Movie = require('../models/Movie');

const MovieData = [
    {
        title: 'Twelve monkeys',
        IMDB_id: 'tt0114746',
        img_link: 'https://m.media-amazon.com/images/M/MV5BN2Y2OWU4MWMtNmIyMy00YzMyLWI0Y2ItMTcyZDc3MTdmZDU4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg'
    },
    {
        title: 'Fargo',
        IMDB_id: 'tt0116282',
        img_link: 'https://m.media-amazon.com/images/M/MV5BNDJiZDgyZjctYmRjMS00ZjdkLTkwMTEtNGU1NDg3NDQ0Yzk1XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'
    },
    {
        title: 'Inception',
        IMDB_id: 'tt1375666',
        img_link: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg'
    },
];

const seedMovie = () => Movie.bulkCreate(MovieData);

module.exports = seedMovie;