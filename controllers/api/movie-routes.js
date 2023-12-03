const router = require('express').Router();
const { commentRating, Movie, User, wishlist } = require('../../models');
const CommentRating = require('../../models/CommentRating');
const Wishlist = require('../../models/Wishlist');


router.get('/:id', async (req, res) => {
    try{
    const IMDB_id = req.params.id;
    const url2 =  `https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=${IMDB_id}&currentCountry=AU`;
    const url3 = `https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id=${IMDB_id}`;
    const url4 = `https://movies-tv-shows-database.p.rapidapi.com/?movieid=${IMDB_id}`
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.MOVIE_API_KEY,
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };
    const options2 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.MOVIE_API_KEY,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            }
        };
    const options3 = {
        method: 'GET',
        headers: {
            Type: 'get-movie-details',
            'X-RapidAPI-Key': process.env.MOVIE_API_KEY,
            'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
            }
        };
    
    const response2 = await fetch(url2, options);
    const result2 = await response2.json();
    const response3 = await fetch(url3, options2);
    const result3 = await response3.json();
    const response4 = await fetch(url4, options3);
    const result4 = await response4.json();

    const imdb_rating = result4.imdb_rating;
    const youtubeKey = result4.youtube_trailer_key;
    const allStreaming = result3.result.streamingInfo;
    const cityArray = (Object.keys(allStreaming));

    let streamArray = [];

const funfunction = (allStreaming) => {
    for (i=0; i < cityArray.length; i++){
    const streamingValue = Object.values(allStreaming)[i];
    console.log(streamingValue);
    streamingValue.forEach(element => {
        let homeService = element.service;
        streamArray.push(homeService);
        console.log(streamArray);
    });
    };
};
 funfunction(allStreaming);
 let summarisedServices = [...new Set(streamArray)];

let movieComments = '';

const getMovie = await Movie.findOne({where: {IMDB_id: req.params.id}});
if (getMovie){
const movieID = getMovie.id;
const comments = await CommentRating.findAll({where: {movie_id: movieID}, include: [{model: User}]} );
movieComments = comments.map((comment) => comment.get({plain:true}));
}

const movieTITLE = result2.title.title;
const moviePoster = result2.title.image.url;
const movieSynopsis = result2.plotSummary.text;
const logged_in = "";

console.log(movieTITLE, moviePoster, movieSynopsis);
// res.status(200).json({movieTITLE, moviePoster, movieSynopsis, imdb_rating, youtubeKey, movieComments, summarisedServices});
res.status(200).render('movie', {movieTITLE, moviePoster, movieSynopsis, imdb_rating, youtubeKey, movieComments, summarisedServices, logged_in: req.session.logged_in});

    }catch(err){
        console.log(err);
    }
    
});

module.exports = router;