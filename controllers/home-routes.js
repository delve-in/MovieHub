const router = require('express').Router();
const sequelize = require('../config/connection');
const { Movie, User } = require('../models');
const CommentRating = require('../models/CommentRating');
const Wishlist = require('../models/Wishlist');

router.get('/', async (req, res) => {
    
    try {
        const topUrl = `https://imdb188.p.rapidapi.com/api/v1/getWeekTop10`;
        const fanUrl = 'https://imdb188.p.rapidapi.com/api/v1/getFanFavorites?country=AU';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': HOME_API_KEY,
                'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
            }
        };
        const topResponse = await fetch(topUrl, options);
        const fanResponse = await fetch(fanUrl, options);

        const topData = await topResponse.json();
        const fanData = await fanResponse.json();

        const topFive = topData.data;
        const fanFav = fanData.data.list;
        const topMovies = [];
        const fanMovies = [];

        
       
        
        for (let i = 0; i < 5; i++) {
            const topMovieName = topFive[i].originalTitleText.text;
            const topImgUrl = topFive[i].primaryImage.imageUrl;
            const fanMovieName = fanFav[i].originalTitleText.text;
            const fanImgUrl = fanFav[i].primaryImage.imageUrl;
            topMovies.push({topMovieName, topImgUrl});
            fanMovies.push({fanMovieName, fanImgUrl});
        }
       res.render("homepage",{topMovies, fanMovies});
    }catch(err){
        console.log(err);
    }

});


module.exports = router;