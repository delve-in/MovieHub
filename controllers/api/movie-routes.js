const router = require('express').Router();
// const { Comments } = require('../../../../Tech-Blog/MVC-tech-blog/models');
const { commentRating, Movie, User, wishlist, Comment } = require('../../models');
const CommentRating = require('../../models/CommentRating');
const Wishlist = require('../../models/Wishlist');


router.get('/:id', async (req, res) => {
    try{
        // res.send('Hi there')
    const IMDB_id = req.params.id;
    const url1 = `https://imdb8.p.rapidapi.com/title/get-details?tconst=${IMDB_id}`;
    const url2 =  `https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=${IMDB_id}&currentCountry=AU`;
    const url3 = `https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id=${IMDB_id}`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'eb00155c14mshf8e725094566b56p172ca5jsnf5a2489f14e5',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };
const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'eb00155c14mshf8e725094566b56p172ca5jsnf5a2489f14e5',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    // const response1 = await fetch(url1, options);
    // const result1 = await response1.json();
    const response2 = await fetch(url2, options);
    const result2 = await response2.json();
    const response3 = await fetch(url3, options2);
    const result3 = await response3.json();
    // console.log(result3);
    // console.log(result3.result.streamingInfo, result3.result.title);


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
//  console.log(summarisedServices);


const getMovie = await Movie.findOne({where: {IMDB_id: req.params.id}}, {include: [{model: CommentRating}, {model: Wishlist}]});
const movieID = getMovie.id;
const comments = await Movie.findByPk(movieID,{include: [{model: CommentRating}]});
const plainMovie = comments.get({plain:true});



    const movieTITLE = result2.title.title;
    const moviePoster = result2.title.image.url;
    const movieSynopsis = result2.plotSummary.text;
    console.log(movieTITLE, moviePoster, movieSynopsis);
    res.status(200).json({movieTITLE, moviePoster, movieSynopsis, comments, summarisedServices});






    }catch(err){
        console.log(err);
    }
    
});

module.exports = router;