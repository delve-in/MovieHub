const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    res.render('signup', {
        logged_in: req.session.logged_in});
  });

router.post('/', async (req, res) => {
    try {
        const findEmail = await User.findOne({where: {email: req.body.email}});
        const findUsername = await User.findOne({where: {username: req.body.username}});
        if ((!findEmail)&&(!findUsername)){
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({message: "okay"});
        });
        }
        else{
            (findEmail) ? res.status(409).json({message: "email conflict"}):
            (findUsername) ? res.status(409).json({message: "username conflict"}):
            res.status(500);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;