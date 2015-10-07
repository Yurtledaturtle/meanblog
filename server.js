var express     =    require('express'),
    bodyParser  =    require('body-parser'),
    mongoose    =    require('mongoose'),
    morgan      =    require('morgan');

// *** Create Application Object ***
var app = express();

// *** Connect to Database ***
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mean_blog');

// *** Server Logging ***
app.use(morgan('dev'));

// *** Setting Public Folder ***
app.use(express.static(__dirname + '/client'));

// *** Config Body Parsing ***
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// *** Route Route ***
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

// *** Routing/Controllers ***
var UsersController = require('./server/controllers/users');
app.use('/api/users', UsersController);
var ReflectionsController = require('./server/controllers/reflections');
app.use('/api/reflections', ReflectionsController);

// *** Start Listening... ***
var port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log("... listening");
});
