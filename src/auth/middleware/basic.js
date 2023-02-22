'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { res.status(401).send('Unauthorized: missing authorization header'); }

  let encodedCredentials = req.headers.authorization.split(' ').pop();
  let decodedCredentials = base64.decode(encodedCredentials);
  let [username, pass] = decodedCredentials.split(':');

  try {
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};