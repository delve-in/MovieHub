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

module.exports =  router;