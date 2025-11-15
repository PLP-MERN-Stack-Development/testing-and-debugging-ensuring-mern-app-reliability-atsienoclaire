const express = require('express');
const router = express.Router();

// Dummy login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'test@test.com' && password === '1234') {
    return res.json({ token: 'dummy-jwt-token', user: { email } });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
