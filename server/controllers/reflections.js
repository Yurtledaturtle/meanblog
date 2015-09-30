var express            =   require('express'),
    User               =   require('../models/user'),
    reflectionsRouter  =   express.Router();

reflectionsRouter.post('/', function(req, res){
  // Find the user by the token
  // Push in the recipe
  // Save the user
  // Send the user back as json
  User.findOne({token: req.headers.token}, function(err, user){
    user.reflections.push(req.body);
    user.save(function(){
      res.json(user);
    });
  });
});

module.exports = reflectionsRouter;
