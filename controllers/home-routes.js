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
                'X-RapidAPI-Key': process.env.HOME_API_KEY,
                'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
            }
        };
        const topResponse = await fetch(topUrl, options);
        const fanResponse = await fetch(fanUrl, options);

        const topData = await topResponse.json();
        const fanData = await fanResponse.json();

        console.log(topData);
        console.log(fanData);

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
       res.render("homepage",{
        topMovies, 
        fanMovies,
        logged_in: req.session.logged_in
    });
    }catch(err){
        console.log(err);
    }

});

router.get('/dashboard', async (req,res) => {
    if (!req.session.logged_in){
        res.redirect('/api/user/login')
    }
    try{

        const allComments = await CommentRating.findAll({include: [{model: User}, {model: Movie}], where: {user_id: req.session.user_id}})
        const refinedComments = allComments.map((comment) => comment.get({ plain: true }));


        let loggedInOrNot = req.session.logged_in;

        let userNumber = req.session.user_id;

        console.log(refinedComments, loggedInOrNot, userNumber);
        res.render('dashboard', {
            loggedInOrNot, 
            userNumber, 
            refinedComments,
            logged_in: req.session.logged_in});
    
    }catch(err){
        console.log(err);
    }


})
module.exports = router;