
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Khetjs' });
};

exports.game = function(req, res){
  res.render('game',{server_addr: 'http://127.0.0.1'});  
};

exports.credits = function(req, res){
  res.render('credits',{});  
}