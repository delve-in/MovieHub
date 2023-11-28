const router = require('express').Router();

const loginRoutes = require('./login-routes.js');
const signupRoutes = require('./signup-routes.js');
const aboutRoutes = require('./about-routes.js');
const movieRoutes = require('./movie-routes.js');

router.use('/login',loginRoutes);
router.use('/signup',signupRoutes);
router.use('/about',aboutRoutes);
router.use('/movie',movieRoutes);

module.exports = router;


