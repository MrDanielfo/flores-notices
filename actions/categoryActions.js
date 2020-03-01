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

const updateCategory = async (filter, update) => {
     try {
          const categoryUpdated = Category.findOneAndUpdate(filter, update, { new: true });
          return categoryUpdated;
     } catch (err) {
          console.log(err);
     }
}

const deleteCategory = async (filter) => {
     try {
          const deleteCategory = Category.findOneAndDelete(filter);
          return await deleteCategory;
     } catch (err) {
          console.log(err);
     }
}

module.exports = {
     getAllCategories,
     createCategory,
     updateCategory,
     deleteCategory
}