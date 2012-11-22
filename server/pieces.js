#!/usr/bin/env node
"use strict";
var assert=require("assert");
var util=require('util');

var BOARD_W=10;
var BOARD_H=8;

var O_NE=1;
var O_SE=2;
var O_SW=3;
var O_NW=4;

var Piece=function(x,y,orientation){
    this.x=x;
    this.y=y;
    this.orientation=orientation;    
};

Piece.prototype.move=function(x1,y1,x2,y2){
    if ((x1<0)||
        (x1>BOARD_W)||
        (y1<0)||
        (y1>BOARD_H)||
        (x2<0)||
        (x2>BOARD_W)||
        (y2<0)||
        (y2>BOARD_H)        
       )
        return false;
    else
        return true;
}

Piece.prototype.rotate=function(x1,y1,rot){
}

Piece.prototype.s=function(x1,y1,x2,y2){
}

function Pharaoh(){
	
}
util.inherits(Pharaoh,Piece);

function Djed(){
	
}
util.inherits(Djed,Piece);

function Pyramid(){
	
}
util.inherits(Pyramid,Piece);

function Obelisk(){
	
}
util.inherits(Obelisk,Piece);


suite('Pieces', function(){
  var p;
  setup(function(){
    p=new Piece();
        
  });
  test('should return false with negative coordinates', function(){
      assert.ok(!p.move(-1,1,2,2));
    });
  test('should return false with greater coordinates', function(){
      assert.ok(!p.move(1,11,2,2));
    });
  test('should return true with right coordinates', function(){
      assert.ok(p.move(1,8,2,8));
    });
    
});

suite('Pharaoh', function(){
  var p;  
  setup(function(){
    p=new Pharaoh()
    
  });
  test('should return false with negative coordinates', function(){
      assert.ok(!p.move(-1,1,2,2));
    });
  test('should return false with greater coordinates', function(){
      assert.ok(!p.move(1,11,2,2));
    });
  test('should return true with right coordinates', function(){
      assert.ok(p.move(1,8,2,8));
    });
    
});
