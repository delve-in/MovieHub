const router = require('express').Router();
const sequelize = require('../config/connection');
const { CommentRating, Movie, User, Wishlist } = require('../models');

router.get('/', (req, res) => res.render('homepage'));

module.exports = router;