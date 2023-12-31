const router = require('express').Router();
const { Movie, User } = require('../models');
const commentRating = require('../models/CommentRating');

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


        const topFive = topData.data;
        const fanFav = fanData.data.list;
        const topMovies = [];
        const fanMovies = [];

        
        for (let i = 0; i < 5; i++) {
            const topMovieName = topFive[i].originalTitleText.text;
            const topImgUrl = topFive[i].primaryImage.imageUrl;
            const topID = topFive[i].id;
            const fanMovieName = fanFav[i].originalTitleText.text;
            const fanImgUrl = fanFav[i].primaryImage.imageUrl;
            const fanID = fanFav[i].id;
            topMovies.push({topMovieName, topImgUrl, topID});
            fanMovies.push({fanMovieName, fanImgUrl, fanID});
        }
       res.render("homepage",{
        topMovies, 
        fanMovies,
        logged_in: req.session.logged_in
    });
    }catch(err){
        res.status(400).json(err);
    }

});

router.get('/dashboard', async (req,res) => {
    if (!req.session.logged_in){
        res.redirect('/api/user/login')
    }
    try{
        let userNumber = req.session.user_id;

        const allComments = await commentRating.findAll({include: [{model: User}, {model: Movie}], where: {user_id: req.session.user_id}, order: [['id', 'desc']]})
        const refinedComments = allComments.map((comment) => comment.get({ plain: true }));
        const userdetails = await User.findOne({where: {id: req.session.user_id}})
        const refinedUser = userdetails.get({plain:true});
        let loggedInOrNot = req.session.logged_in;


        res.render('dashboard', {
            loggedInOrNot, 
            userNumber, 
            refinedComments,
            refinedUser,
            logged_in: req.session.logged_in
            });

    }catch(err){
        res.status(400).json(err);
    }


});

module.exports = router;