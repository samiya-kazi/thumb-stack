const Thumbnail = require('../models/thumbnail');

async function getThumbnails (req, res) {
  try {
    const thumbnails = await Thumbnail.find({userId: req.params.userId});
    res.status(200).send(thumbnails);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}


async function postThumbnail (req, res) {
  try {
    const thumbnail = await Thumbnail.create(req.body);
    res.status(201).send(thumbnail);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}


module.exports = {
  getThumbnails,
  postThumbnail
}