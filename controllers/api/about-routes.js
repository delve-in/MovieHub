const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('aboutpage',{
      logged_in: req.session.logged_in
    });
  });

module.exports = router;