const router = require('express').Router();
const { User, Comment, Movie} = require('../../models');
const commentRating = require('../../models/CommentRating');
const wishList = require('../../models/Wishlist');


router.get("/:id", async (req,res) => {
    try{
    const allWishes = await wishList.findAll({where: {user_id: req.params.id}, include: {model: Movie}, order: [['created_at', 'desc']]});
    res.status(200).json(allWishes);
    }catch(err){
        res.status(400).json(err);
    }
})

router.post('/', async (req,res) => {
    try{
        const checkMovie = await Movie.findOne({where: {IMDB_id: req.body.imdbID}});
        if(!checkMovie){
            await Movie.create({
                title: req.body.title,
                IMDB_id: req.body.imdbID,
                img_link: req.body.img
            })
        };
        const getID = await Movie.findOne({where: {IMDB_id: req.body.imdbID}, attributes: ['id']});
        const movieID = getID.dataValues.id;

        const newWish = await wishList.create({
            movie_id: movieID,
            user_id: req.body.user_id
        });

        const checkLength = await wishList.findAll({where: {user_id: req.body.user_id}});
        const cleanLength = checkLength.map((wish) => wish.get({ plain: true }));
        if (cleanLength.length>10){
            const wishID = cleanLength[0].id;
            const wishMovID = cleanLength[0].movie_id;
            const checkWishes = await wishList.count({where: {movie_id: wishMovID}});
            const checkComments = await commentRating.count({where: {movie_id: wishMovID}});
            await wishList.destroy({where: {id: wishID}})
            if ((checkWishes === 1)&&(checkComments === 0)){
                await Movie.destroy({where: {id: wishMovID}});
            };
        }
        res.status(200).json(newWish);
    }catch(err){
        res.status(400).json(err);
    }

}),

router.get('/count/:user_id/:movie_id', async (req,res) => {
    try{
    const count = await wishList.count({where: {
        user_id: req.params.user_id, 
        movie_id: req.params.movie_id}});
    res.status(200).json(count);
    }catch(err){
        res.status(400).json(err);
    }
});

module.exports =  router;