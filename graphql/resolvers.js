const bcrypt = require('bcryptjs');
const { getAllUsers, createUser, getUser, createToken, updateUser } = require('../actions/userActions');
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('../actions/categoryActions');
const { getAllNotices, createNotice, updateNotice, deleteNotice } = require('../actions/noticeActions');

const resolvers = {
     Query: {
          getUsers: () => {
               try {
                    return getAllUsers();
               } catch (err) {
                    console.log(err);
               }
          },
          getUser: async (parent, { email }, context, info) => {
               try {
                    return await getUser(email);
               } catch (err) {
                    console.log(err);
               }
          },
          getCategories: () => {
               try {
                    return getAllCategories();
               } catch (err) {
                    console.log(err)
               }
          },
          getNotices: () => {
               try {
                   return getAllNotices();
               } catch (err) {
                    console.log(err);
               }
          }
     },
     Mutation: {
          addUser: async (parent, { data }, context, info) => {
               try {
                    console.log(data);
                    const user = await getUser(data.username);
                    // console.log(user);
                    if (user) {
                         throw new Error('User already exist');
                    } 

                    const newUser = createUser(data);
                    return { token: createToken(newUser, process.env.SECRET, '1hr') }
                   
  
               } catch (err) {
                    console.log(err);
               }
          },
          updateUser: async (parent, { data, email}, context, info) => {
               try {
                    
                    // Encriptar Password sólo si está en la data
                    if (data.password !== undefined || data.password !== '') {
                         bcrypt.genSalt(10, (err, salt) => {
                              if (err) return err;
                              bcrypt.hash(data.password, salt, async (err, hash) => {
                                   if (err) return err;
                                   data.password = hash;
                                    const filter = { email };
                                    const update = { $set: { ...data } };
                                    return await updateUser(filter, update);      
                              })
                         })
                    }

                    const filter = { email };
                    const update = { $set: { ...data } };
                    return await updateUser(filter, update); 
                  
               } catch (err) {
                    console.log(err)
               }
          },
          addCategory: async (parent, { data }, context, info) => {
               try {
                    const newCategory = createCategory(data);
                    return newCategory;
               } catch (err) {
                    console.log(err);
               }
          },
          updateCategory: async (parent, { data, categoryId }, context, info) => {
               try {
                    const filter = { _id: categoryId };
                    const update = { $set: { ...data } };
                    return await updateCategory(filter, update);
               } catch (err) {
                    console.log(err)
               }
          },
          deleteCategory: async (parent, { categoryId }, context, info) => {
               try {
                    const filter = { _id: categoryId };
                    return await deleteCategory(filter);
               } catch (err) {
                    console.log(err)
               }
          },
          addNotice: async (parent, { data }, context, info) => {
               try {
                    const newNotice = createNotice(data);
                    return newNotice;
               } catch (err) {
                    console.log(err)
               }
          },
          updateNotice: async (parent, { data, noticeId }, context, info) => {
               try {
                    const filter = { _id: noticeId };
                    const update = { $set: { ...data } };
                    return await updateNotice(filter, update);
               } catch (err) {
                    console.log(err)
               }
          },
          deleteNotice: async (parent, { noticeId }, context, info) => {
               try {
                    const filter = { _id: noticeId };
                    return await deleteNotice(filter);
               } catch (err) {
                    console.log(err)
               }
          },
     }
}



module.exports = resolvers;