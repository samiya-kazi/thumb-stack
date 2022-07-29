const bcrypt = require('bcryptjs');
const User = require('../models/user');

const create = async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const pass = req.body.password;

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(pass, salt);

    const user = await User.findOne({email});

    if(!user) {
      const result = await User.create({email, password, firstName, lastName});
      req.session.sid = result._id;
  
      res.status(201).send(result);
    } else {
      res.status(400).send('Account already exists.');
    }

  } catch (error) {
    res.status(500);
    console.log(error);
  }
};


const login = async (req, res) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;

    const user = await User.findOne({email});

    if(user) {
      if(bcrypt.compareSync(pass, user.password)) {
        req.session.sid = user._id;
        res.status(200);
        res.send(user);
      } else {
        res.status(401);
        res.send('invalid password');
      }
    } else {
      res.status(400);
      res.send('User does not exist');
    }  
  } catch (error) {
    res.status(500);
    console.log(error);
  }

};

const logout = (req, res) => {
  req.session.destroy((e) => {
    if(e) res.status(500).send('Something went wrong');
    else {
      res.clearCookie('sid');
      res.sendStatus(200);
    }
  })
};


module.exports = { create, login, logout };