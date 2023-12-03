const router = require('express').Router();
const { commentRating, Movie, User} = require('../../models');
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
        res.status(200).json(newWish);
    }catch(err){
        console.log(err);
    }

})

module.exports =  router;