const router = require('express').Router();
const { commentRating, Movie, User, Comment} = require('../../models');
const CommentRating = require('../../models/CommentRating');
const Wishlist = require('../../models/Wishlist');


router.get("/:id", async (req,res) => {
    const allWishes = await Wishlist.findAll({where: {user_id: req.params.id}, include: {model: Movie}});
    const cleanWishes = allWishes.map((wish) => wish.get({ plain: true}));
    console.log(cleanWishes);
    res.status(200).json(allWishes);
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
        const getID = await Movie.findOne({where: {IMDB_id: req.body.imdbID}});
        const cleanID = getID.get({ plain: true });
        const movieID = cleanID.id;

        const newWish = await Wishlist.create({
            movie_id: movieID,
            user_id: req.body.user_id
        });

        const checkLength = await Wishlist.findAll({where: {user_id: req.body.user_id}});
        const cleanLength = checkLength.map((wish) => wish.get({ plain: true }));
        if (cleanLength.length>10){
            const wishID = cleanLength[0].id;
            const wishMovID = cleanLength[0].movie_id;
            const checkWishes = await Wishlist.count({where: {movie_id: wishMovID}});
            const checkComments = await CommentRating.count({where: {movie_id: wishMovID}});
            // const cleanComments = checkComments.get({plain:true})
            await Wishlist.destroy({where: {id: wishID}})
            if ((checkWishes === 1)&&(checkComments === 0)){
                await Movie.destroy({where: {id: wishMovID}});
            };
        }
        res.status(200).json(newWish);
    }catch(err){
        console.log(err);
    }

}),

router.post('/count/', async (req,res) => {
    try{
        const countWish = await Wishlist.count({where: {
            user_id: req.body.user_id,
            movie_id: req.body.movie_id
        }})
        res.status(200).json(countWish);
    }catch(err){
        console.log(err)
    }
});

module.exports =  router;