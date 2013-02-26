/*
 * Module: khet.js
 * Date: 2012-12-13
 * Author: Yuri Valentini <yuroller@gmail.com>,
 *  Emanuele Bizzarri <emabiz76@gmail.com>
 */

/*jslint node:true, indent: 2, nomen: true*/

'use strict';

var util = require('util');

///////////////////////////////////////////////////////////////////////////
// Constants
///////////////////////////////////////////////////////////////////////////

// var BOARD_W = exports.BOARD_W = 10;
// var BOARD_H = exports.BOARD_H = 8;


/**
 * Piece orientation on board
 */

var Orientation = exports.Orientation = {
  NONE: -1,
  NE: 0,
  SE: 1,
  SW: 2,
  NW: 3
};


/**
 * Laser travelling direction
 */

var LaserDirection = exports.LaserDirection = {
  HIT: -1,
  N: 0,
  E: 1,
  S: 2,
  W: 3
};

var EXCHANGE_DIR = [
  LaserDirection.S,
  LaserDirection.W,
  LaserDirection.N,
  LaserDirection.E
];


/**
 * Board piece color
 */

var Color = exports.Color = {
  NONE: '.',
  SILVER: 'S',
  RED: 'R'
};


/**
 * Board pieces types
 */

var PieceType = exports.PieceType = {
  NONE: ' ',
  PHARAOH: 'h',
  DJED: 'd',
  PYRAMID: 'p',
  OBELISK: 'o',
  OBELISK2: 'O' // stacked
};


/**
 * Standard board
 */

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


/**
 * Classic game placement of pieces
 */

var SETUP_CLASSIC = exports.SETUP_CLASSIC = [
  {x: 4, y: 0, t: PieceType.OBELISK2,     c: Color.SILVER,    o: Orientation.NONE},
  {x: 5, y: 0, t: PieceType.PHARAOH,      c: Color.SILVER,    o: Orientation.NONE},
  {x: 6, y: 0, t: PieceType.OBELISK2,     c: Color.SILVER,    o: Orientation.NONE},
  {x: 7, y: 0, t: PieceType.PYRAMID,      c: Color.SILVER,    o: Orientation.SE},
  {x: 2, y: 1, t: PieceType.PYRAMID,      c: Color.SILVER,    o: Orientation.SW},
  {x: 3, y: 2, t: PieceType.PYRAMID,      c: Color.RED,       o: Orientation.NW},
  {x: 0, y: 3, t: PieceType.PYRAMID,      c: Color.SILVER,    o: Orientation.NE},
  {x: 2, y: 3, t: PieceType.PYRAMID,      c: Color.RED,       o: Orientation.SW},
  {x: 4, y: 3, t: PieceType.DJED,         c: Color.SILVER,    o: Orientation.NE},
  {x: 5, y: 3, t: PieceType.DJED,         c: Color.SILVER,    o: Orientation.SE},
  {x: 7, y: 3, t: PieceType.PYRAMID,      c: Color.SILVER,    o: Orientation.SE},
  {x: 9, y: 3, t: PieceType.PYRAMID,      c: Color.RED,       o: Orientation.NW},
  {x: 0, y: 4, t: PieceType.PYRAMID,      c: Color.SILVER,    o: Orientation.SE},
  {x: 2, y: 4, t: PieceType.PYRAMID,      c: Color.RED,       o: Orientation.NW},
  {x: 4, y: 4, t: PieceType.DJED,         c: Color.RED,       o: Orientation.SE},
  {x: 5, y: 4, t: PieceType.DJED,         c: Color.RED,       o: Orientation.NE},
  {x: 7, y: 4, t: PieceType.PYRAMID,      c: Color.SILVER,    o: Orientation.NE},
  {x: 9, y: 4, t: PieceType.PYRAMID,      c: Color.RED,       o: Orientation.SW},
  {x: 6, y: 5, t: PieceType.PYRAMID,      c: Color.SILVER,    o: Orientation.SE},
  {x: 7, y: 6, t: PieceType.PYRAMID,      c: Color.RED,       o: Orientation.NE},
  {x: 2, y: 7, t: PieceType.PYRAMID,      c: Color.RED,       o: Orientation.NW},
  {x: 3, y: 7, t: PieceType.OBELISK2,     c: Color.RED,       o: Orientation.NONE},
  {x: 4, y: 7, t: PieceType.PHARAOH,      c: Color.RED,       o: Orientation.NONE},
  {x: 5, y: 7, t: PieceType.OBELISK2,     c: Color.RED,       o: Orientation.NONE},
];


///////////////////////////////////////////////////////////////////////////
// Surface
///////////////////////////////////////////////////////////////////////////

/**
 * Surface constructor
 *
 * @param {Array} surfaceRaw board surface by rows using strings
 */

var Surface = exports.Surface = function (surfaceRaw) {
  this.surfaceRaw = surfaceRaw;
};


/**
 * Gets board tile color
 *
 * @param {Number} x coordinate of tile
 * @param {Number} y coordinate of tile
 * @return {Color} tile color
 */

Surface.prototype.getTileColor = function (x, y) {
  return this.surfaceRaw[y].charAt(x);
};


/**
 * Gets board width
 *
 * @return {Number}
 */

Surface.prototype.getWidth = function () {
  return this.surfaceRaw[0].length;
};


/**
 * Gets board height
 *
 * @return {Number}
 */

Surface.prototype.getHeight = function () {
  return this.surfaceRaw.length;
};


///////////////////////////////////////////////////////////////////////////
// Piece
///////////////////////////////////////////////////////////////////////////

/**
 * Piece constructor
 *
 * @param {PieceType} pieceType type of piece
 * @param {Color} color piece color
 * @param {Orientation} orientation piece orientation
 */

var Piece = exports.Piece = function (pieceType, color, orientation) {
  this.pieceType = pieceType;
  this.color = color;
  this.orientation = orientation;
};


/**
 * Gets piece type
 *
 * @return {PieceType} piece type
 */

Piece.prototype.getPieceType = function () {
  return this.pieceType;
};


/**
 * Gets piece color
 *
 * @return {Color} piece color
 */

Piece.prototype.getColor = function () {
  return this.color;
};


/**
 * Gets piece orientation
 *
 * @return {Orientation} piece orientation
 */

Piece.prototype.getOrientation = function () {
  return this.orientation;
};


///////////////////////////////////////////////////////////////////////////
// PieceNull
///////////////////////////////////////////////////////////////////////////

/**
 * Empty tile on board
 */

var PieceNull = exports.PieceNull = function () {
  PieceNull.super_.call(this, PieceType.NONE, Color.NONE, Orientation.NONE);
};


/**
 * Inherits from Piece
 */

util.inherits(PieceNull, Piece);


/**
 * Calculates laser deviation when travelling through piece
 *
 * @param {LaserDirection} fromDirection direction of laser entering the tile
 * @return {LaserDirection} exit laser direction or piece hit indication
 */

PieceNull.prototype.bounceLaser = function (fromDirection) {
  return EXCHANGE_DIR[fromDirection];
};


/**
 * Empty tile piece
 */

var pieceNullObj = exports.pieceNullObj = new PieceNull();


///////////////////////////////////////////////////////////////////////////
// PiecePharaoh
///////////////////////////////////////////////////////////////////////////

/**
 * Piece of type Pharaoh
 */

var PiecePharaoh = exports.PiecePharaoh = function (color) {
  PiecePharaoh.super_.call(this, PieceType.PHARAOH, color, Orientation.NONE);
};


/**
 * Inherits from Piece
 */

util.inherits(PiecePharaoh, Piece);


/**
 * Calculates laser deviation when travelling through piece
 *
 * @param {LaserDirection} fromDirection direction of laser entering the tile
 * @return {LaserDirection} exit laser direction or piece hit indication
 */

PiecePharaoh.prototype.bounceLaser = function (fromDirection) {
  return LaserDirection.HIT;
};


///////////////////////////////////////////////////////////////////////////
// PieceDjed
///////////////////////////////////////////////////////////////////////////

/**
 * Piece of type Djed
 */

var PieceDjed = exports.PieceDjed = function (color, orientation) {
  PieceDjed.super_.call(this, PieceType.DJED, color, orientation);
};


/**
 * Inherits from Piece
 */

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


/**
 * Calculates laser deviation when travelling through piece
 *
 * @param {LaserDirection} fromDirection direction of laser entering the tile
 * @return {LaserDirection} exit laser direction or piece hit indication
 */

PieceDjed.prototype.bounceLaser = function (fromDirection) {
  if (this.getOrientation() === Orientation.NE || this.getOrientation() === Orientation.SW) {
    return BOUNCE_LASER_DJED_NE[fromDirection];
  }
  return BOUNCE_LASER_DJED_SE[fromDirection];
};


///////////////////////////////////////////////////////////////////////////
// PiecePyramid
///////////////////////////////////////////////////////////////////////////

/**
 * Piece of type Pyramid
 */

var PiecePyramid = exports.PiecePyramid = function (color, orientation) {
  PiecePyramid.super_.call(this, PieceType.PYRAMID, color, orientation);
};


/**
 * Inherits from Piece
 */

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


/**
 * Calculates laser deviation when travelling through piece
 *
 * @param {LaserDirection} fromDirection direction of laser entering the tile
 * @return {LaserDirection} exit laser direction or piece hit indication
 */

PiecePyramid.prototype.bounceLaser = function (fromDirection) {
  var orientation = this.getOrientation();
  return BOUNCE_LASER_PYRAMID_ORIENTATION[orientation][fromDirection];
};


///////////////////////////////////////////////////////////////////////////
// PieceObelisk
///////////////////////////////////////////////////////////////////////////

/**
 * Piece of type Obelisk (not stacked)
 */

var PieceObelisk = exports.PieceObelisk = function (color) {
  PieceObelisk.super_.call(this, PieceType.OBELISK, color, Orientation.NONE);
};


/**
 * Inherits from Piece
 */

util.inherits(PieceObelisk, Piece);


/**
 * Calculates laser deviation when travelling through piece
 *
 * @param {LaserDirection} fromDirection direction of laser entering the tile
 * @return {LaserDirection} exit laser direction or piece hit indication
 */

PieceObelisk.prototype.bounceLaser = function (fromDirection) {
  return LaserDirection.HIT;
};


///////////////////////////////////////////////////////////////////////////
// PieceObelisk2
///////////////////////////////////////////////////////////////////////////

/**
 * Piece of type Obelisk (stacked)
 */

var PieceObelisk2 = exports.PieceObelisk2 = function (color) {
  PieceObelisk2.super_.call(this, PieceType.OBELISK2, color, Orientation.NONE);
};


/**
 * Inherits from Piece
 */

util.inherits(PieceObelisk2, Piece);


/**
 * Calculates laser deviation when travelling through piece
 *
 * @param {LaserDirection} fromDirection direction of laser entering the tile
 * @return {LaserDirection} exit laser direction or piece hit indication
 */

PieceObelisk2.prototype.bounceLaser = function (fromDirection) {
  return LaserDirection.HIT;
};


///////////////////////////////////////////////////////////////////////////
// createPieceFromSetup
///////////////////////////////////////////////////////////////////////////

/**
 * Factory function to create pieces
 *
 * @param {Array} setup array of pieces descriptions
 * @param {Number} x position of tile
 * @param {Number} y position of tile
 * @return {Piece} pieceNullObj if tile empty or new piece of corresponding type
 */

var createPieceFromSetup = exports.createPieceFromSetup = function (setup, x, y) {
  var i,
    l = setup.length,
    elem,
    p = pieceNullObj;
  for (i = 0; i < l; i += 1) {
    elem = setup[i];
    if (elem.x === x && elem.y === y) {
      if (elem.t === PieceType.PHARAOH) {
        p = new PiecePharaoh(elem.c);
        break;
      } else if (elem.t === PieceType.DJED) {
        p = new PieceDjed(elem.c, elem.o);
        break;
      } else if (elem.t === PieceType.PYRAMID) {
        p = new PiecePyramid(elem.c, elem.o);
        break;
      } else if (elem.t === PieceType.OBELISK) {
        p = new PieceObelisk(elem.c);
        break;
      } else if (elem.t === PieceType.OBELISK2) {
        p = new PieceObelisk2(elem.c);
        break;
      }
    }
  }
  return p;
};


///////////////////////////////////////////////////////////////////////////
// LaserGun
///////////////////////////////////////////////////////////////////////////

/**
 * LaserGun constructor
 *
 * @param {Number} x position of first entering laser tile
 * @param {Number} y position of first entering laser tile
 * @param {LaserDirection} fromLaserDirection entering laser direction
 */

var LaserGun = exports.LaserGun = function (x, y, fromLaserDirection) {
  this.x = x;
  this.y = y;
  this.fromLaserDirection = fromLaserDirection;
};


/**
 * Gets x position of first entering laser tile
 *
 * @return {Number} x position of entering laser tile
 */

LaserGun.prototype.getX = function () {
  return this.x;
};


/**
 * Gets y position of first entering laser tile
 *
 * @return {Number} y position of entering laser tile
 */

LaserGun.prototype.getY = function () {
  return this.y;
};


/**
 * Gets entering laser direction
 *
 * @return {LaserDirection} entering laser direction
 */

LaserGun.prototype.getFromLaserDirection = function () {
  return this.fromLaserDirection;
};


///////////////////////////////////////////////////////////////////////////
// LaserPath
///////////////////////////////////////////////////////////////////////////

/**
 * LaserPath constructor
 *
 * @param {LaserGun} laserGun laser that fires
 */

var LaserPath = exports.LaserPath = function (laserGun) {
  this.laserGun = laserGun;
  this.toLaserDirectionAry = [];
  this.lastX = laserGun.getX();
  this.lastY = laserGun.getY();
  this.lastFromLaserDirection = laserGun.getFromLaserDirection();
};


/**
 * Gets last x tile position
 *
 * @return {Number}
 */

LaserPath.prototype.getLastX = function () {
  return this.lastX;
};


/**
 * Gets last y tile position
 *
 * @return {Number}
 */

LaserPath.prototype.getLastY = function () {
  return this.lastY;
};


/**
 * Gets last entering laser direction
 *
 * @return {LaserDirection}
 */

LaserPath.prototype.getLastFromLaserDirection = function () {
  return this.lastFromLaserDirection;
};


var LASER_DIRECTION_X_OFFS = [ 0, 1, 0, -1];
var LASER_DIRECTION_Y_OFFS = [ -1, 0, 1, 0];

/**
 * Appends a laser segment
 *
 * @param {LaserDirection} toLaserDirection laser segment to append
 */

LaserPath.prototype.append = function (toLaserDirection) {
  this.toLaserDirectionAry.push(toLaserDirection);
  this.lastX += LASER_DIRECTION_X_OFFS[toLaserDirection];
  this.lastY += LASER_DIRECTION_Y_OFFS[toLaserDirection];
  this.lastFromLaserDirection = EXCHANGE_DIR[toLaserDirection];
};


/**
 * Gets tiles positions crossed by laser
 *
 * @return {Array} array of [x, y] tile positions
 */

LaserPath.prototype.getTilesPositions = function () {
  var a = [],
    x = this.laserGun.getX(),
    y = this.laserGun.getY(),
    l = this.toLaserDirectionAry.length,
    i,
    d;
  a.push([x, y]);
  for (i = 0; i < l; i += 1) {
    d = this.toLaserDirectionAry[i];
    if (d === LaserDirection.HIT) {
      break;
    }
    x += LASER_DIRECTION_X_OFFS[d];
    y += LASER_DIRECTION_Y_OFFS[d];
    a.push([x, y]);
  }
  return a;
};


///////////////////////////////////////////////////////////////////////////
// Board
///////////////////////////////////////////////////////////////////////////

/**
 * Board constructor
 *
 * @param {Surface} surface
 * @param {Array} laserGuns array of LaserGun
 */

var Board = exports.Board = function (surface, laserGuns) {
  this.surface = surface;
  this.laserGuns = laserGuns;
  this.content = [];
};


/**
 * Places pieces on the board
 *
 * @param {Array} setup array of pieces descriptions
 */

Board.prototype.placePieces = function (setup) {
  var x, y,
    w = this.surface.getWidth(),
    h = this.surface.getHeight();
  this.content = [];
  for (y = 0; y < h; y += 1) {
    this.content.push([]);
    for (x = 0; x < w; x += 1) {
      this.content[y].push(createPieceFromSetup(setup, x, y));
    }
  }
};

/**
 * Gets board surface
 *
 * @return {Surface}
 */

Board.prototype.getSurface = function () {
  return this.surface;
};


/**
 * Gets board laser guns array
 *
 * @return {Array} array of LaserGun
 */

Board.prototype.getLaserGuns = function () {
  return this.laserGuns;
};


/**
 * Gets piece at board tile position
 *
 * @return {Piece} piece or pieceNullObj if tile empty
 */

Board.prototype.getPiece = function (x, y) {
  return this.content[y][x];
};


/**
 * Calculates path the laser takes
 *
 * @param {Number} laserGunIndex index of gun to fire
 * @return {LaserPath}
 */

Board.prototype.fireLaser = function (laserGunIndex) {
  var path = new LaserPath(this.laserGuns[laserGunIndex]),
    x = path.getLastX(),
    y = path.getLastY(),
    fromDir,
    toDir = EXCHANGE_DIR[path.getLastFromLaserDirection()],
    w = this.surface.getWidth(),
    h = this.surface.getHeight(),
    piece;
  while (toDir !== LaserDirection.HIT
      && 0 <= x && x < w
      && 0 <= y && y < h) {
    //console.log('x = ' + x + '; y = ' + y);
    piece = this.getPiece(x, y);
    fromDir = EXCHANGE_DIR[toDir];
    toDir = piece.bounceLaser(fromDir);
    path.append(toDir);
    x = path.getLastX();
    y = path.getLastY();
  }
  return path;
};