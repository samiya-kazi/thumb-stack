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


async function updateThumbnail (req, res) {
  try {
    const id = req.query.tid;
    const newAttr = req.body;
    newAttr.lastModified = Date.now();
    const thumbnail = await Thumbnail.findById(id);
    
    for(const [key, value] of Object.entries(newAttr)) {
      thumbnail[key] = value
    }

    const newThumbnail = await thumbnail.save();

    res.status(201).send(newThumbnail);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}


async function deleteThumbnail (req, res) {
  try {
    const result = await Thumbnail.findByIdAndDelete(req.query.tid);
    res.status(200).send(result);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}


module.exports = {
  getThumbnails,
  postThumbnail,
  updateThumbnail,
  deleteThumbnail
}