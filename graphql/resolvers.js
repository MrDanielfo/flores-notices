const { getAllUsers, createUser, getUser, createToken } = require('../actions/userActions');
const { getAllCategories, createCategory } = require('../actions/categoryActions');
const { getAllNotices, createNotice } = require('../actions/noticeActions');

const resolvers = {
     Query: {
          getUsers: () => {
               try {
                    return getAllUsers();
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
                    const user = await getUser(data.email);
                    if (user) {
                         throw new Error('User already exist');
                    }
                    const newUser = createUser(data);
                    return { token: createToken(newUser, process.env.SECRET, '1hr') }
               } catch (err) {
                    console.log(err);
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
          addNotice: async (parent, { data }, context, info) => {
               try {
                    const newNotice = createNotice(data);
                    return newNotice;
               } catch (err) {
                    console.log(err)
               }
          }
     }
}



module.exports = resolvers;