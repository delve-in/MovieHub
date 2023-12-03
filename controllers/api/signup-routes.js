const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    res.render('signup', {
        logged_in: req.session.logged_in});
  });

router.post('/', async (req, res) => {
    console.log("3");
    console.log(req.body);
    try {
        const userData = await User.create(req.body);
        console.log("4");
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            console.log("5");
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log("6");
        res.status(400).json(err);
    }
});

module.exports = router;