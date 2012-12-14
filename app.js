
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , khet = require('./lib/khet');

var app = express();

app.configure(function(){
//  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/game',routes.game);
app.get('/credits',routes.credits);


var server = http.createServer(app)
  , io = require('socket.io').listen(server);

server.listen(process.env.PORT || 3000);

var board = new khet.Board(khet.SURFACE, khet.SETUP_CLASSIC);

var translitterate = function (p) {
  if (p.length === 0) {
    return ' ';
  } else if (p.length === 2) {
    if (p[0].t !== p[1].t || p[0].t !== khet.PieceType.OBELISK) {
      throw new Error('Wrong double pieces');
    }
    return p[0].t.toUpperCase();
  }
  return p[0].t;
};

var renderBoard = function (board) {
  var x, y, r = [], p;
  for (y = 0; y < khet.BOARD_H; y += 1) {
    r[y] = [];
    for (x = 0; x < khet.BOARD_W; x += 1) {
      p = board[y][x];
      r[y][x] = translitterate(p.pieces);
    }
  }
  return r;
};

io.sockets.on('connection', function (socket) {
  socket.on('request_board', function (data) {
    socket.emit('status_board', renderBoard(board.content));
  });
});


