const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  collegeName: {
    type: String,
    required: true,
  },
  location: {
    type: {
      city: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  collegeType: {
    type: String, // 'Private' or 'Public'
    required: true,
  },
  courses: {
    type: [String],
    required: true,
  },
  nirfRanking: {
    type: Number, // Assuming it's a numeric value
  },
  fieldOfStudy: {
    type: String,
    required: true,
  },
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;
