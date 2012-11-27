#!/usr/bin/env node
'use strict';
var assert=require('assert');
var util=require('util');

var BOARD_W=10;
var BOARD_H=8;

var Orientation = {
    NONE: 0,
    NE: 1,
    SE: 2,
    SW: 3,
    NW: 4
};

var Color = {
    BLACK: 0,
    SILVER: 1,
    RED: 2
};

var PieceType = {
    PHARAOH: 1,
    DJED: 2,
    PYRAMID: 3,
    OBELISK: 4    
};

var SURFACE = [
    'SRBBBBBBSR',
    'SBBBBBBBBR',
    'SBBBBBBBBR',
    'SBBBBBBBBR',
    'SBBBBBBBBR',
    'SBBBBBBBBR',
    'SBBBBBBBBR',
    'SRBBBBBBSR'
    ];
          
var getColorFromSurface = function(surface, x, y) {
    var c = surface[y][x],
        types = {
            'S': Color.SILVER,
            'R': Color.RED,
            'B': Color.BLACK
        };
    return types[c];
};

var SETUP_CLASSIC = [
    {x: 4, y: 0, t: PieceType.OBELISK,      c: Color.SILVER,    o: Orientation.NONE},
    {x: 4, y: 0, t: PieceType.OBELISK,      c: Color.SILVER,    o: Orientation.NONE},
    {x: 5, y: 0, t: PieceType.PHARAOH,      c: Color.SILVER,    o: Orientation.NONE},
    {x: 6, y: 0, t: PieceType.OBELISK,      c: Color.SILVER,    o: Orientation.NONE},
    {x: 6, y: 0, t: PieceType.OBELISK,      c: Color.SILVER,    o: Orientation.NONE},
    {x: 7, y: 0, t: PieceType.PIRAMID,      c: Color.SILVER,    o: Orientation.SE},
    {x: 2, y: 1, t: PieceType.PIRAMID,      c: Color.SILVER,    o: Orientation.SW},
    {x: 3, y: 2, t: PieceType.PIRAMID,      c: Color.RED,       o: Orientation.NW},
    {x: 0, y: 3, t: PieceType.PIRAMID,      c: Color.SILVER,    o: Orientation.NE},
    {x: 2, y: 3, t: PieceType.PIRAMID,      c: Color.RED,       o: Orientation.SW},
    {x: 4, y: 3, t: PieceType.DJED,         c: Color.SILVER,    o: Orientation.NE},
    {x: 5, y: 3, t: PieceType.DJED,         c: Color.SILVER,    o: Orientation.SE},
    {x: 7, y: 3, t: PieceType.PIRAMID,      c: Color.SILVER,    o: Orientation.SE},
    {x: 9, y: 3, t: PieceType.PIRAMID,      c: Color.RED,       o: Orientation.NW},
    {x: 0, y: 4, t: PieceType.PIRAMID,      c: Color.SILVER,    o: Orientation.SE},
    {x: 2, y: 4, t: PieceType.PIRAMID,      c: Color.RED,       o: Orientation.NW},
    {x: 4, y: 4, t: PieceType.DJED,         c: Color.RED,       o: Orientation.SE},
    {x: 5, y: 4, t: PieceType.DJED,         c: Color.RED,       o: Orientation.NE},
    {x: 7, y: 4, t: PieceType.PIRAMID,      c: Color.SILVER,    o: Orientation.NE},
    {x: 9, y: 4, t: PieceType.PIRAMID,      c: Color.RED,       o: Orientation.SW},
    {x: 6, y: 5, t: PieceType.PIRAMID,      c: Color.SILVER,    o: Orientation.SE},
    {x: 7, y: 6, t: PieceType.PIRAMID,      c: Color.RED,       o: Orientation.NE},
    {x: 2, y: 7, t: PieceType.PIRAMID,      c: Color.RED,       o: Orientation.NW},
    {x: 3, y: 7, t: PieceType.OBELISK,      c: Color.RED,       o: Orientation.NONE},
    {x: 3, y: 7, t: PieceType.OBELISK,      c: Color.RED,       o: Orientation.NONE},
    {x: 4, y: 7, t: PieceType.PHARAOH,      c: Color.RED,       o: Orientation.NONE},
    {x: 5, y: 7, t: PieceType.OBELISK,      c: Color.RED,       o: Orientation.NONE},
    {x: 5, y: 7, t: PieceType.OBELISK,      c: Color.RED,       o: Orientation.NONE}
];

var getPiecesFromSetup = function (setup, x, y) {
    var pieces = [],
        s;
    for (s in setup) {
        if (s.x === x && s.y === y) {
            pieces.push(s);
        }
    }
    return pieces;
};


///////////////////////////////////////////////////////////////////////////
// Piece
///////////////////////////////////////////////////////////////////////////

var Piece = function(pieceType, color, orientation) {
    this.pieceType = pieceType;
    this.color = color;
    this.orientation = orientation;    
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


///////////////////////////////////////////////////////////////////////////
// Box
///////////////////////////////////////////////////////////////////////////

var Box = function(color, pieces) {
    this.color = color;
    this.pieces = pieces;
};


///////////////////////////////////////////////////////////////////////////
// Board
///////////////////////////////////////////////////////////////////////////

var Board = function(surface, setup) {
    var x, y, pieces;
    this.content = new Array(BOARD_H);
    for (y = 0; y < BOARD_H; y += 1) {
        this.content[y] = new Array(BOARD_W);
        for (x = 0; x < BOARD_W; x += 1) {
            pieces = getPiecesFromSetup(setup, x, y);
            this.content[y][x] = new Box(getColorFromSurface(surface, x, y), pieces);
        }
    }
};


///////////////////////////////////////////////////////////////////////////
// Test
///////////////////////////////////////////////////////////////////////////


suite('getColorFromSurface', function(){
  var surface;
  setup(function(){
    surface = ['RBS', 'SBR'];
  });
  test('should return red color at (0,0)', function(){
      assert.equal(getColorFromSurface(surface, 0, 0), Color.RED);
    });
  test('should return silver color at (1,0)', function(){
      assert.equal(getColorFromSurface(surface, 1, 0), Color.SILVER);
    });    
});

