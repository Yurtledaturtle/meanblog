var express            =   require('express'),
    User               =   require('../models/user'),
    recipesRouter      =   express.Router();

recipesRouter.post('/', function(req, res){
  // Find the user by the token
  // Push in the recipe
  // Save the user
  // Send the user back as json
  User.findOne({token: req.headers.token}, function(err, user){
    user.recipes.push(req.body);
    user.save(function(){
      res.json(user);
    });
  });
});

module.exports = recipesRouter;
