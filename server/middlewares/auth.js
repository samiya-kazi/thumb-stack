const User = require('../models/user.js');

const authMiddleware = async (req, res, next) => {
   try {
      const uid = req.session.sid;
      console.log('session uid in authmiddleware', uid);

      if(uid) {
        const user = await User.findById(uid);
        req.user = user;
        next();
      } else {
        res.status(403);
        res.send('Not authorized');
      }
   } catch(error) {
      console.log(error);
      res.setStatus(401).end();
   }
};

module.exports = authMiddleware;