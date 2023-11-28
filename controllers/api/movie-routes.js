const router = require('express').Router();
const { CommentRating, Movie, User, Wishlist } = require('../../models');


router.get('/', (req, res) => res.send('Hi there'));

module.exports = router;