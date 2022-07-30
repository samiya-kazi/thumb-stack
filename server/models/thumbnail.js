const { model, Schema,  } = require('mongoose');
const thumbnailElementSchema = require('./thumbnailElement');

const thumbnailSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  elements: [thumbnailElementSchema],
  background: {
    type: String,
    required: true,
    default: '#000000'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  imageSrc: {
    type: String,
    required: true
  }
});

const Thumbnail = model('Thumbnail', thumbnailSchema);

module.exports = Thumbnail;