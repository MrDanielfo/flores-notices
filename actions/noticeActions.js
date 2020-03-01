const Notice = require('../models/Notice');

const getAllNotices = async () => {
     try {
          return await Notice.find()
          .populate({path: 'categoryId', model: 'Category'})
          .populate({path: 'userId', model: 'User'});
                                   
     } catch (err) {
          console.log(err);
     }
}

const createNotice = async (notice) => {
     try {
          const noticeCreated = await Notice.create(notice);
          return noticeCreated;
     } catch (err) {
          console.log(err);
     }
}

const updateNotice = async (filter, update) => {
     try {
          const noticeUpdated =  Notice.findOneAndUpdate(filter, update, { new: true});
          return await noticeUpdated;
     } catch (err) {
          console.log(err);
     }
}

const deleteNotice = async (filter) => {
     try {
          const noticeDeleted = Notice.findOneAndDelete(filter);
          return await noticeDeleted;
     } catch (err) {
          console.log(err);
     }
}

module.exports = {
     getAllNotices,
     createNotice,
     updateNotice,
     deleteNotice
}