/*
 * Module: khet_spec.js
 * Date: 2012-12-13
 * Author: Yuri Valentini <yuroller@gmail.com>,
 *  Emanuele Bizzarri <emabiz76@gmail.com>
 */
 
'use strict';

var khet = require("./lib/khet");
var assert = require('assert');

suite('getColorFromSurface', function () {
  var surface;
  setup(function () {
    surface = ['RBS', 'SBR'];
  });
  test('should return red color at (0,0)', function () {
    assert.equal(khet.getColorFromSurface(surface, 0, 0), khet.Color.RED);
  });
  test('should return silver color at (0,1)', function () {
    assert.equal(khet.getColorFromSurface(surface, 0, 1), khet.Color.SILVER);
  });    
});

suite('getPiecesFromSetup', function () {
  var s;
  setup(function(){
    s = [{x: 4, y: 0, t: khet.PieceType.OBELISK, c: khet.Color.SILVER, o: khet.Orientation.NONE}];
  });
  test('should return [OBELISK] at (4,0)', function(){
    var p = khet.getPiecesFromSetup(s, 4, 0);
    assert.equal(p.length, 1);
    assert.equal(p[0].t, khet.PieceType.OBELISK);
    assert.equal(p[0].c, khet.Color.SILVER);
    assert.equal(p[0].o, khet.Orientation.NONE);
  });
});