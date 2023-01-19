const express = require('express');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "REUNIONAPI" 

function verifyToken(req, res, next) {
    let token = req.headers["authorization"];
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, SECRET_KEY, (err, valid) => {
        if (err) {
          res.send({ result: "Please provide valid token" });
        } else {
          next();
        }
      });
    } else {
      res.send({ result: "please add token with header" });
    }
  }

module.exports = verifyToken;