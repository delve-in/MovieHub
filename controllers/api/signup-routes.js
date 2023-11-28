const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => res.send('Hi there'));



module.exports = router;