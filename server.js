var express       =       require('express'),
    bodyParser    =       require('body-parser'),
    mongoose      =       require('mongoose'),
    http          =       require('http'),
    socketIo      =       require('socket.io'),
    morgan        =       require('morgan');


var app = express();

var wrapperServer = http.Server(app);
var io = socketIo(wrapperServer);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/meanblogserver');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

io.on('connection', function(socket){

  console.log('...user connected');

  socket.on('sending message', function(message){
      console.log('received message: ', message);
      var chat = new Chat(message);
      chat.save(function(){
        io.emit('emitting message', message);
      });
  });
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html')
});

app.get('/api/chats', function(req, res){
  Chat.find({}, function(err, chats){
    res.json(chats);
  });
});

// var UsersController = require('./server/controllers/users');
// app.use('/api/users', UsersController);
// var RecipesController = require('./server/controllers/recipes');
// app.use('/api/recipes', RecipesController);

var port = process.env.PORT || '8080';
wrapperServer.listen(port, function(){
  console.log('listening');
});
