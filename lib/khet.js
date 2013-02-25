/*
 * Module: khet.js
 * Date: 2012-12-13
 * Author: Yuri Valentini <yuroller@gmail.com>,
 *  Emanuele Bizzarri <emabiz76@gmail.com>
 */

/*jslint node:true, indent: 2, nomen: true*/
'use strict';
var util = require('util');

var BOARD_W = exports.BOARD_W = 10;
var BOARD_H = exports.BOARD_H = 8;

var Orientation = exports.Orientation = {
  NONE: -1,
  NE: 0,
  SE: 1,
  SW: 2,
  NW: 3
};

var LaserDirection = exports.LaserDirection = {
  HIT: -1,
  N: 0,
  E: 1,
  S: 2,
  W: 3
};

var Color = exports.Color = {
  NONE: '.',
  SILVER: 'S',
  RED: 'R'
};

var PieceType = exports.PieceType = {
  NONE: ' ',
  PHARAOH: 'h',
  DJED: 'd',
  PYRAMID: 'p',
  OBELISK: 'o',
  OBELISK2: 'O' // stacked
};

var SURFACE_RAW = exports.SURFACE_RAW = [
  'SR......SR',
  'S........R',
  'S........R',
  'S........R',
  'S........R',
  'S........R',
  'S........R',
  'SR......SR'
];

var SETUP_CLASSIC = exports.SETUP_CLASSIC = [
  {x: 4, y: 0, t: PieceType.OBELISK2,     c: Color.SILVER,    o: Orientation.NONE},
  {x: 5, y: 0, t: PieceType.PHARAOH,      c: Color.SILVER,    o: Orientation.NONE},
  {x: 6, y: 0, t: PieceType.OBELISK2,     c: Color.SILVER,    o: Orientation.NONE},
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
  {x: 3, y: 7, t: PieceType.OBELISK2,     c: Color.RED,       o: Orientation.NONE},
  {x: 4, y: 7, t: PieceType.PHARAOH,      c: Color.RED,       o: Orientation.NONE},
  {x: 5, y: 7, t: PieceType.OBELISK2,     c: Color.RED,       o: Orientation.NONE},
];


///////////////////////////////////////////////////////////////////////////
// Surface
///////////////////////////////////////////////////////////////////////////

var Surface = exports.Surface = function (surfaceRaw) {
  this.surfaceRaw = surfaceRaw;
};

Surface.prototype.getTileColor = function (x, y) {
  return this.surfaceRaw[y].charAt(x);
};

///////////////////////////////////////////////////////////////////////////
// Piece
///////////////////////////////////////////////////////////////////////////

var Piece = exports.Piece = function (pieceType, color, orientation) {
  this.pieceType = pieceType;
  this.color = color;
  this.orientation = orientation;
};

Piece.prototype.getPieceType = function () {
  return this.pieceType;
};

Piece.prototype.getColor = function () {
  return this.color;
};

Piece.prototype.getOrientation = function () {
  return this.orientation;
};


///////////////////////////////////////////////////////////////////////////
// PieceNull
///////////////////////////////////////////////////////////////////////////

var PieceNull = exports.PieceNull = function () {
  PieceNull.super_.call(this, PieceType.NONE, Color.NONE, Orientation.NONE);
};

util.inherits(PieceNull, Piece);

PieceNull.prototype.bounceLaser = function (fromDirection) {
  return fromDirection;
};

var pieceNullObj = exports.pieceNullObj = new PieceNull();


///////////////////////////////////////////////////////////////////////////
// PiecePharaoh
///////////////////////////////////////////////////////////////////////////

var PiecePharaoh = exports.PiecePharaoh = function (color) {
  PiecePharaoh.super_.call(this, PieceType.PHARAOH, color, Orientation.NONE);
};

util.inherits(PiecePharaoh, Piece);

PiecePharaoh.prototype.bounceLaser = function (fromDirection) {
  return LaserDirection.HIT;
};


///////////////////////////////////////////////////////////////////////////
// PieceDjed
///////////////////////////////////////////////////////////////////////////

var PieceDjed = exports.PieceDjed = function (color, orientation) {
  PieceDjed.super_.call(this, PieceType.DJED, color, orientation);
};

util.inherits(PieceDjed, Piece);

var BOUNCE_LASER_DJED_NE = [
  LaserDirection.E,
  LaserDirection.N,
  LaserDirection.W,
  LaserDirection.S
];

var BOUNCE_LASER_DJED_SE = [
  LaserDirection.W,
  LaserDirection.S,
  LaserDirection.E,
  LaserDirection.N
];

PieceDjed.prototype.bounceLaser = function (fromDirection) {
  if (this.getOrientation() === Orientation.NE || this.getOrientation() === Orientation.SW) {
    return BOUNCE_LASER_DJED_NE[fromDirection];
  }
  return BOUNCE_LASER_DJED_SE[fromDirection];
};


///////////////////////////////////////////////////////////////////////////
// PiecePyramd
///////////////////////////////////////////////////////////////////////////

var PiecePyramid = exports.PiecePyramid = function (color, orientation) {
  PiecePyramid.super_.call(this, PieceType.PYRAMID, color, orientation);
};

util.inherits(PiecePyramid, Piece);

var BOUNCE_LASER_PYRAMID_NE = [
  LaserDirection.E,
  LaserDirection.N,
  LaserDirection.HIT,
  LaserDirection.HIT
];

var BOUNCE_LASER_PYRAMID_SE = [
  LaserDirection.HIT,
  LaserDirection.S,
  LaserDirection.E,
  LaserDirection.HIT
];

var BOUNCE_LASER_PYRAMID_SW = [
  LaserDirection.HIT,
  LaserDirection.HIT,
  LaserDirection.W,
  LaserDirection.S
];

var BOUNCE_LASER_PYRAMID_NW = [
  LaserDirection.W,
  LaserDirection.HIT,
  LaserDirection.HIT,
  LaserDirection.N
];

var BOUNCE_LASER_PYRAMID_ORIENTATION = [
  BOUNCE_LASER_PYRAMID_NE,
  BOUNCE_LASER_PYRAMID_SE,
  BOUNCE_LASER_PYRAMID_SW,
  BOUNCE_LASER_PYRAMID_NW
];

PiecePyramid.prototype.bounceLaser = function (fromDirection) {
  var orientation = this.getOrientation();
  return BOUNCE_LASER_PYRAMID_ORIENTATION[orientation][fromDirection];
};


///////////////////////////////////////////////////////////////////////////
// PieceObelisk
///////////////////////////////////////////////////////////////////////////

var PieceObelisk = exports.PieceObelisk = function (color) {
  PieceObelisk.super_.call(this, PieceType.OBELISK, color, Orientation.NONE);
};

util.inherits(PieceObelisk, Piece);

PieceObelisk.prototype.bounceLaser = function (fromDirection) {
  return LaserDirection.HIT;
};


///////////////////////////////////////////////////////////////////////////
// PieceObelisk2
///////////////////////////////////////////////////////////////////////////

var PieceObelisk2 = exports.PieceObelisk2 = function (color) {
  PieceObelisk2.super_.call(this, PieceType.OBELISK2, color, Orientation.NONE);
};

util.inherits(PieceObelisk2, Piece);

PieceObelisk2.prototype.bounceLaser = function (fromDirection) {
  return LaserDirection.HIT;
};


///////////////////////////////////////////////////////////////////////////
// createPieceFromSetup
///////////////////////////////////////////////////////////////////////////

var createPieceFromSetup = exports.createPieceFromSetup = function (setup, x, y) {
  var i,
    l = setup.length,
    elem;
  for (i = 0; i < l; i += 1) {
    elem = setup[i];
    if (elem.x === x && elem.y === y) {
      return new Piece(elem.t, elem.c, elem.o);
      // if (elem.t === PieceType.Pharaoh) {
        // return new PiecePharaoh(elem.c)
      // }
    }
  }
  return pieceNullObj;
};

///////////////////////////////////////////////////////////////////////////
// Board
///////////////////////////////////////////////////////////////////////////

var Board = exports.Board = function (surface) {
  this.surface = surface;
  this.content = [];
};

Board.prototype.Init = function (setup) {
  var x, y;
  this.content = [];
  for (y = 0; y < BOARD_H; y += 1) {
    this.content.push([]);
    for (x = 0; x < BOARD_W; x += 1) {
      this.content[y].push(createPieceFromSetup(setup, x, y));
    }
  }
};

Board.prototype.GetSurface = function () {
  return this.surface;
};

Board.prototype.GetPiece = function (x, y) {
  return this.content[y][x];
};
