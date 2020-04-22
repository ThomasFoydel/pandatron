const mongoose = require('mongoose');

const presetSchema = {
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   email: {
  //     type: String,
  //     required: true
  //   },
  //   password: {
  //     type: String,
  //     required: true
  //   },
  //   age: {
  //     type: Number
  //   },
  //   city: {
  //     type: String
  //   },
  //   profilePicId: {
  //     type: String
  //   },
  //   coverPicId: {
  //     type: String
  //   },
  //   friendList: {
  //     type: [Schema.Types.ObjectId],
  //     ref: 'User'
  //   },
  //   status: {
  //     type: String
  //   },
  //   bio: {
  //     type: String
  //   }
};

module.exports = mongoose.model('Preset', presetSchema);
