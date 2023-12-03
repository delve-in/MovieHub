const router = require('express').Router();
const { User, Movie, } = require('../../models');
const Wishlist = require('../../models/Wishlist')
const CommentRating = require('../../models/CommentRating');

router.get('/:id', async (req,res) => {
    if (!req.session.logged_in){
        res.redirect('/api/signup')
    }
    try{
        const singleComment = await CommentRating.findByPk(req.params.id, {include: [{model: Movie}]});
        const newComment = singleComment.get({ plain: true });
        console.log(newComment);
        res.status(200).render('comment',{
            newComment,
            logged_in: req.session.logged_in
          });
    }catch(err){
        console.log(err);
    }
});

router.post('/', async (req,res) => {
        const IMDB = req.body.imdbID;
    try{
        const checkMovie = await Movie.findOne({where: {IMDB_id: req.body.imdbID}});
        if(!checkMovie){
            const newMovie = await Movie.create({
                title: req.body.title,
                IMDB_id: req.body.imdbID,
                img_link: req.body.img
            })
        }
        const getID = await Movie.findOne({where: {IMDB_id: req.body.imdbID}});
        const correctedID = getID.get({ plain: true});
        const searchID  = correctedID.id;
        const newComment = await CommentRating.create({
            user_id: req.body.user_id,
            movie_id: searchID,
            comment: req.body.comment,
            rating: req.body.rating,
        });
        res.status(200).redirect(`api/movie/${IMDB}`);
       
    }catch(err){
        console.log(err);
    }

})

router.delete('/', async (req,res) => {
    try{
        const getDetails = await CommentRating.findByPk(req.body.id);
        const refinedDetails = getDetails.get({ plain: true});
        const movieID = refinedDetails.movie_id;
        const checkComments = await CommentRating.findAll({ where: {movie_id: movieID}});
        const refinedCommets = checkComments.map((comment) => comment.get({ plain: true}));
        const checkWishlist = await Wishlist.findAll({ where: {movie_id: movieID}});


        const deleteComment = await CommentRating.destroy({ where: {id: req.body.id}});

        if ((refinedCommets.length === 1)&&(checkWishlist.length === 0)){
            await Movie.destroy({where: {id: movieID}});
        }

        console.log('Comment Deleted');
        res.status(200).json(deleteComment);
    }catch(err){
        console.log(err)
    }
});

router.put('/', async (req,res) =>{
    try{
        const updateComment = await CommentRating.update({
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

})

module.exports = router;