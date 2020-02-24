const Notice = require('../models/Notice');

const getAllNotices = async () => {
     try {
          return await Notice.find()
                                   .populate('userId', ['name', 'surname', 'email'])
                                   .populate('categoryId', ['name', 'description']);
     } catch (err) {
          console.log(err);
     }
}

const createNotice = async (notice) => {
     try {
          const noticeCreated = await Notice.create(notice);
                                             // .populate('userId', ['name', 'surname', 'email'])
                                             // .populate('categoryId', ['name', 'description']);
          return noticeCreated;
     } catch (err) {
          console.log(err);
     }
}

module.exports = {
     getAllNotices,
     createNotice
}