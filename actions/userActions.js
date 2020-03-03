require('dotenv').config({'path': 'variables.env'})
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createToken = (user, secret, expiresIn) => {
     const  { username, role, email } = user;
     return jwt.sign({username, role, email}, secret, {expiresIn});
}

const getCurrentUser = (req) => {
     try {
          const token = req.headers['authorization'];
          if (typeof token === typeof undefined) return req;

          console.log(token);

          if (token !== null) {
               try {
                   const currentUser = jwt.verify(token, process.env.SECRET);
                   return req.currentUser = currentUser;
               } catch (err) {
                    console.log(err);
               }
          }   
     } catch (err) {
          console.log(err);
     }
}

const getAllUsers = async () => {
     try {
          return await User.find();
     } catch (err) {
          console.log(err);
     }
}

const getUser = async (username) => {
     try {
         return await User.findOne({ username });
     } catch (err) {
          console.log(err);
     }
}

const getUserLogin = async (email) => {
     try {
          return await User.findOne({ email });
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

const updateUser = async (filter, update) => {
     try {
          const userUpdated = await User.findOneAndUpdate(filter, update, { new: true });
          return userUpdated;
     } catch (err) {
          console.log(err);
     }
}

const checkPassword = async (password, userPassword) => {
     try {
          const isValidPassword = await bcrypt.compare(password, userPassword);
          if (!isValidPassword) {
               return false;
          }
          return true;

     } catch (err) {
          console.log(err);
     }
}

module.exports = {
     getAllUsers,
     createUser,
     getUser,
     createToken,
     getCurrentUser,
     updateUser,
     checkPassword,
     getUserLogin
}