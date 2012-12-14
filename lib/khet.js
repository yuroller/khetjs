/*
 * Module: khet.js
 * Date: 2012-12-13
 * Author: Yuri Valentini <yuroller@gmail.com>,
 *  Emanuele Bizzarri <emabiz76@gmail.com>
 */

/*jslint node:true, indent: 2*/
'use strict';
var util = require('util');

var BOARD_W = exports.BOARD_W = 10;
var BOARD_H = exports.BOARD_H = 8;

var Orientation = exports.Orientation = {
  NONE: 0,
  NE: 1,
  SE: 2,
  SW: 3,
  NW: 4
};

var Color = exports.Color = {
  BLACK: 0,
  SILVER: 1,
  RED: 2
};

var PieceType = exports.PieceType = {
  PHARAOH: 'h',
  DJED: 'd',
  PYRAMID: 'p',
  OBELISK: 'o'
};

var SURFACE = exports.SURFACE = [
  'SRBBBBBBSR',
  'SBBBBBBBBR',
  'SBBBBBBBBR',
  'SBBBBBBBBR',
  'SBBBBBBBBR',
  'SBBBBBBBBR',
  'SBBBBBBBBR',
  'SRBBBBBBSR'
];

var getColorFromSurface = exports.getColorFromSurface = function (surface, x, y) {
  var r = surface[y],
    c = r[x],
    types = {
      'S': Color.SILVER,
      'R': Color.RED,
      'B': Color.BLACK
    };
  return types[c];
};

var SETUP_CLASSIC = exports.SETUP_CLASSIC = [
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

var getPiecesFromSetup = exports.getPiecesFromSetup = function (setup, x, y) {
  var pieces = [],
    i,
    l = setup.length;
  for (i = 0; i < l; i += 1) {
    if (setup[i].x === x && setup[i].y === y) {
      pieces.push(setup[i]);
    }
  }
  return pieces;
};


///////////////////////////////////////////////////////////////////////////
// Piece
///////////////////////////////////////////////////////////////////////////

var Piece = exports.Piece = function (pieceType, color, orientation) {
  this.pieceType = pieceType;
  this.color = color;
  this.orientation = orientation;
};


///////////////////////////////////////////////////////////////////////////
// Box
///////////////////////////////////////////////////////////////////////////

var Box = function (color, pieces) {
  this.color = color;
  this.pieces = pieces;
};


///////////////////////////////////////////////////////////////////////////
// Board
///////////////////////////////////////////////////////////////////////////

var Board = exports.Board = function (surface, setup) {
  var x, y, pieces;
  this.content = [];
  for (y = 0; y < BOARD_H; y += 1) {
    this.content.push([]);
    for (x = 0; x < BOARD_W; x += 1) {
      pieces = getPiecesFromSetup(setup, x, y);
      this.content[y].push(new Box(getColorFromSurface(surface, x, y), pieces));
    }
  }
};
