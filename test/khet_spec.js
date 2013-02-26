/*
 * Module: khet_spec.js
 * Date: 2012-12-13
 * Author: Yuri Valentini <yuroller@gmail.com>,
 *  Emanuele Bizzarri <emabiz76@gmail.com>
 */
 
'use strict';

var khet = require("../lib/khet");
var assert = require('assert');

///////////////////////////////////////////////////////////////////////////
// Surface
///////////////////////////////////////////////////////////////////////////

suite('Surface', function () {
  var surface;
  setup(function () {
    surface = new khet.Surface(['R.S', 'S.R']);
  });
  test('should return red color at (0,0)', function () {
    assert.equal(surface.getTileColor(0, 0), khet.Color.RED);
  });
  test('should return silver color at (0,1)', function () {
    assert.equal(surface.getTileColor(0, 1), khet.Color.SILVER);
  });    
  test('should return none color at (1,0)', function () {
    assert.equal(surface.getTileColor(1, 0), khet.Color.NONE);
  });    
});


///////////////////////////////////////////////////////////////////////////
// createPieceFromSetup
///////////////////////////////////////////////////////////////////////////

suite('createPieceFromSetup', function () {
  var piecesSetup = [
    {x: 7, y: 0, t: khet.PieceType.PYRAMID,      c: khet.Color.SILVER,    o: khet.Orientation.SE},
    {x: 4, y: 7, t: khet.PieceType.PHARAOH,      c: khet.Color.RED,       o: khet.Orientation.NONE}
  ];
  test('should return piece at (7,0)', function () {
    var p = khet.createPieceFromSetup(piecesSetup, 7, 0);
    assert.equal(p.getPieceType(), khet.PieceType.PYRAMID);
    assert.equal(p.getColor(), khet.Color.SILVER);
    assert.equal(p.getOrientation(), khet.Orientation.SE);
  });
  test('should return piece at (4,7)', function () {
    var p = khet.createPieceFromSetup(piecesSetup, 4, 7);
    assert.equal(p.getPieceType(), khet.PieceType.PHARAOH);
    assert.equal(p.getColor(), khet.Color.RED);
    assert.equal(p.getOrientation(), khet.Orientation.NONE);
  });
  test('should return no piece at (3,4)', function () {
    var p = khet.createPieceFromSetup(piecesSetup, 3, 4);
    assert.equal(p.getPieceType(), khet.PieceType.NONE);
    assert.equal(p.getColor(), khet.Color.NONE);
    assert.equal(p.getOrientation(), khet.Orientation.NONE);
  });
});


///////////////////////////////////////////////////////////////////////////
// LaserPath
///////////////////////////////////////////////////////////////////////////

suite('LaserPath.getTilesPositions', function () {
  var laserGun = new khet.LaserGun(0, 0, khet.LaserDirection.S),
    laserPath;
  setup(function () {
    laserPath = new khet.LaserPath(laserGun);
  });
  test('should return gun position when no segment appended', function () {
    var p = laserPath.getTilesPositions();
    assert.deepEqual(p, [[0,0]]);
  });
  test('should return down tile when appended south segment', function () {
    laserPath.append(khet.LaserDirection.S);
    var p = laserPath.getTilesPositions();
    assert.deepEqual(p, [[0,0], [0,1]]);
  });
  test('should return right tile when appended east segment', function () {
    laserPath.append(khet.LaserDirection.E);
    var p = laserPath.getTilesPositions();
    assert.deepEqual(p, [[0,0], [1,0]]);
  });
  test('should return down and down-right tile when appended south and east segment', function () {
    laserPath.append(khet.LaserDirection.S);
    laserPath.append(khet.LaserDirection.E);
    var p = laserPath.getTilesPositions();
    assert.deepEqual(p, [[0,0], [0,1], [1,1]]);
  });
});
