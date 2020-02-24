const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
     const  { name, surname, email } = user;
     return jwt.sign({name, surname, email}, secret, {expiresIn});
}

const getAllUsers = async () => {
     try {
          return await User.find();
     } catch (err) {
          console.log(err);
     }
}

const getUser = async (email) => {
     try {
         return await User.findOne({email});
     } catch (err) {
          console.log(err);
     }
}

const createUser = async (user) => {
     try {
          const userCreated = await User.create(user);
          return userCreated;
     } catch (err) {
          console.log(err);
     }
}

module.exports = {
     getAllUsers,
     createUser,
     getUser,
     createToken
}