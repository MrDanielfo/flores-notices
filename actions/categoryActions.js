const Category = require('../models/Category');

const getAllCategories = async () => {
     try {
          return await Category.find();
     } catch (err) {
          console.log(err);
     }
}

const createCategory = async (category) => {
     try {
          const categoryCreated = await Category.create(category);
          return categoryCreated;
     } catch (err) {
          console.log(err);
     }
}

module.exports = {
     getAllCategories,
     createCategory
}