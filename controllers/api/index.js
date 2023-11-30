const router = require('express').Router();

const loginRoutes = require('./user-routes.js');
const signupRoutes = require('./signup-routes.js');
const aboutRoutes = require('./about-routes.js');
const movieRoutes = require('./movie-routes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/user',loginRoutes);
router.use('/signup',signupRoutes);
router.use('/about',aboutRoutes);
router.use('/movie',movieRoutes);
router.use('/comment', commentRoutes);

module.exports = router;


