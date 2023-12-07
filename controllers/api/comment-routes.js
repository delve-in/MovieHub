const router = require('express').Router();
const { User, Movie, } = require('../../models');
const wishList = require('../../models/Wishlist')
const commentRating = require('../../models/CommentRating');
const { Sequelize } = require('sequelize');

router.get('/:id', async (req,res) => {
    if (!req.session.logged_in){
        res.redirect('/api/signup')
    }
    try{
        const singleComment = await commentRating.findByPk(req.params.id, {include: [{model: Movie}]});
        const newComment = singleComment.get({ plain: true });
        res.status(200).render('comment',{
            newComment,
            logged_in: req.session.logged_in
          });
    }catch(err){
        console.log(err);
    }
});

router.post('/', async (req,res) => {

    try{
        const checkMovie = await Movie.findOne({where: {IMDB_id: req.body.imdbID}});
        if(!checkMovie){
                await Movie.create({
                title: req.body.title,
                IMDB_id: req.body.imdbID,
                img_link: req.body.img
            })
        }
        const getID = await Movie.findOne({where: {IMDB_id: req.body.imdbID}, attributes: ['id']});
        const searchID  = getID.dataValues.id;
        const newComment = await commentRating.create({
            user_id: req.body.user_id,
            movie_id: searchID,
            comment: req.body.comment,
            rating: req.body.rating,
        });
        res.status(200).json(newComment);
       
    }catch(err){
        console.log(err);
    }

});

router.delete('/', async (req,res) => {
    try{
        const getDetails = await commentRating.findByPk(req.body.id);
        const refinedDetails = getDetails.get({ plain: true});
        const movieID = refinedDetails.movie_id;
        
        const checkComments = await commentRating.count({ where: {movie_id: movieID}});
        const checkWishlist = await wishList.count({ where: {movie_id: movieID}});

        const deleteComment = await commentRating.destroy({ where: {id: req.body.id}});

        if ((checkComments === 1)&&(checkWishlist === 0)){
            await Movie.destroy({where: {id: movieID}});
        }

        res.status(200).json(deleteComment);
    }catch(err){
        console.log(err)
    }
});

router.put('/', async (req,res) =>{
    try{
        const updateComment = await commentRating.update({
            comment: req.body.newText
        },
        {
            where: {
                id: req.body.id,
            },
        })
        res.status(200).json(updateComment);
    }catch(err){
        console.log(err);
    }
});

router.get('/avgRating/:id', async (req,res) => {
    try{
        const findAvg = await commentRating.findOne({
            where: {movie_id: req.params.id},
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating'],
            ],
            raw:true,
        })
        res.status(200).json(findAvg);
    }catch(err){
        console.log(err);
    }
});

router.get('/list/:id', async (req, res) => {
    try{
        const getMovie = await Movie.findOne({where: {IMDB_id: req.params.id}});
        const movieID = getMovie.id;
        const comments = await commentRating.findAll({where: {movie_id: movieID}, include: [{model: User}]} );
        let movieComments = comments.map((comment) => comment.get({plain:true}));
        res.status(200).json(movieComments);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;