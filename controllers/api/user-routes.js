const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
  res.render('login', {
    logged_in: req.session.logged_in
  });
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard',{
      logged_in: req.session.logged_in
    });
    return;
  }

  res.render('login',{
    logged_in: req.session.logged_in
  });
});


router.post('/login', async (req, res) => {
  
  console.log(req.body.email);
  console.log(req.body.password);


  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(userData);
    if (!userData) {
      console.log("3 inside not user data");
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log("3 before checking password");
    const validPassword = await userData.checkPassword(req.body.password);

    console.log(validPassword);
    console.log("4 after password check");
    if (!validPassword) {
      console.log("5 if not valid password");
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log("6 session start");
    req.session.save(() => {
      console.log("7 session save");
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log("8 session inside");
      res.json({ user: userData, message: 'You are now logged in!' });
      console.log("9 after login message");
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
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
