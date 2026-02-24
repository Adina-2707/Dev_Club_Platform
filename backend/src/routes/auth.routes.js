const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');

router.post('/', register);
router.post('/', login);

module.exports = router;

router.post('/register', register);
router.post('/login', login);