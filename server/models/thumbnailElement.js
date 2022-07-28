const { Schema } = require('mongoose');

const thumbnailElementSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  key: {
    type: Number,
    required: true
  },
  x:{
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  width: Number, 
  height: Number,
  text: String,
  fontSize: Number,
  numPoints: Number, 
  innerRadius: Number,
  outerRadius: Number,
  radius: Number,
  fontFamily: String,
  fill: String,
  draggable: Boolean,
});

module.exports = thumbnailElementSchema