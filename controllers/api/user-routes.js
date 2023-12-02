const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});


router.post('/login', async (req, res) => {
  
  console.log(req.body.email);
  console.log(req.body.password);


  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(userData);
    if (!userData) {
      console.log("3");
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log("3.2");
    const validPassword = await userData.checkPassword(req.body.password);

    console.log(validPassword);
    console.log("4");
    if (!validPassword) {
      console.log("5");
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log("6");
    req.session.save(() => {
      console.log("7");
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log("8");
      res.json({ user: userData, message: 'You are now logged in!' });
      console.log("9");
    });
    console.log("10");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  console.log("13");
  if (req.session.logged_in) {
    console.log("12");
    req.session.destroy(() => {
      res.status(204).end();
      console.log("14");
      res.redirect('/api/user/');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
