const { model, Schema,  } = require('mongoose');
const thumbnailElementSchema = require('./thumbnailElement');

const thumbnailSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  elements: [thumbnailElementSchema],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Thumbnail = model('Thumbnail', thumbnailSchema);

module.exports = Thumbnail;