
/*
 * GET home page.
 */

var pieces=require("../pieces");

var b=new pieces.Board(pieces.SURFACE,pieces.SETUP_CLASSIC);

exports.index = function(req, res){
  res.render('index', { title: 'Khetjs' });
};

exports.game = function(req, res){
  res.render('game',{board: JSON.stringify(b)});  
};

exports.credits = function(req, res){
  res.render('credits',{});  
}