const express = require('express');
const postRouter = express.Router();
const { signUp, login ,productadd} = require('../controllers/postcontroller');

// SIGN UP ROUTE
postRouter.post('/signup', signUp);

// LOGIN ROUTE
postRouter.post('/login', login);
postRouter.post('/productadd', productadd);


module.exports = postRouter;