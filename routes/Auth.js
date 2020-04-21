const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  console.log('register route hit. req body: ', req.body);
  res.json({ name: 'ricky bobby' });
});

router.post('/login', (req, res) => {
  console.log('login route hit. req body: ', req.body);
  res.json({ name: 'ricky bobby' });
});

module.exports = router;
