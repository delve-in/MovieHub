const router = require('express').Router();
const { User, Movie } = require('../../models');
const CommentRating = require('../../models/CommentRating');

router.get('/:id', async (req,res) => {
    // if (!req.session.loggedIn){
    //     res.redirect('/login')
    // }
    try{
        const singleComment = await CommentRating.findByPk(req.params.id, {include: [{model: Movie}]});
        const newComment = singleComment.get({ plain: true });
        console.log(newComment);
        res.status(200).render('comment', newComment);
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
            user_id: req.session.user_id,
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
        const deleteComment = await CommentRating.destroy({ where: {id: req.body.id},});
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