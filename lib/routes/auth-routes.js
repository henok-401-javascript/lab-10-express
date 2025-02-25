'use strict';
///// Resources
const express = require('express');
const bcrypt = require('bcrypt');
////////// Internal routes /////

const { person } = require('../models/model.js');

const router = express.Router();
const base64Decoder = (encodedstring) => {
  let data = {
    username: '',
    password: '',
  };
  let bufferString = Buffer.from(encodedstring, 'base64').toString();
  let splitBeffer = bufferString.split(':');
  data.username = splitBeffer[0];
  data.password = splitBeffer[1];

  return data;
};


/**
 * It allow us to create products .
 * @route POST /signup
 * @returns {object} 200 - The created Object.
 * @returns {error} - if something wrong on creating Model.
 */

router.post('/signup', async (req, res, next) => {
  let results = await person.create(req.body);
  res.send(results);
});

/**
 * It allow us to create products .
 * @route POST /signin
 * @returns {object} 200 - will authenticate the right information.
 * @returns {error} - will send try again , until they have the right information.
 */
router.post('/signin', async (req, res, next) => {
  //req.header.authorization
  let basicAuth = req.headers.authorization.split(' ');
  console.log(basicAuth);
  if (basicAuth.length === 2 && basicAuth[0] === 'Basic') {
    let userData = base64Decoder(basicAuth[1]);
    console.log('to match in the loop', userData);
    let userNameMatch = await person.readByQuery({
      username: userData.username,
    });

    console.log('my buffer match', userNameMatch);

    for (let i = 0; i < userNameMatch.length; i++) {
      console.log(userData.password);
      console.log(userNameMatch[i].password);

      let match = await bcrypt.compare(
        userData.password,
        userNameMatch[i].password,
      );

      console.log('this is match', match);
      if (match) {
        req.results = userNameMatch[i];
        // console.log('this is what wer are ', userNameMatch[i]);
        break;
      }
    }
    if (req.results) {
      res.status(200);
      res.send('found');
    } else {
      res.status(401);
      res.send('not found');
    }
  }

  res.end();
});

/**
 * This page will give the created model.
 * @route GET /users
 * @returns {object} 200 - return all the users from the stored database.
 * @returns {error} - if they wrote wrong path. 
 */

router.get('/users', async (req, res, next) => {
  const result = await person.readAll();
  res.send(result);
});

module.exports = router;
