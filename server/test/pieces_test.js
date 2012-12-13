///////////////////////////////////////////////////////////////////////////
// Test
///////////////////////////////////////////////////////////////////////////
"use strict";

var pieces = require("../pieces");
var assert=require('assert');

suite('getColorFromSurface', function(){
  var surface;
  setup(function(){
    surface = ['RBS', 'SBR'];
  });
  test('should return red color at (0,0)', function(){
      assert.equal(pieces.getColorFromSurface(surface, 0, 0), pieces.Color.RED);
    });
  test('should return silver color at (0,1)', function(){
      assert.equal(pieces.getColorFromSurface(surface, 0, 1), pieces.Color.SILVER);
    });    
});

suite('getPiecesFromSetup', function(){
  var s;
  setup(function(){
    s = [{x: 4, y: 0, t: pieces.PieceType.OBELISK, c: pieces.Color.SILVER, o: pieces.Orientation.NONE}];
  });
  test('should return [OBELISK] at (4,0)', function(){
      var p = pieces.getPiecesFromSetup(s, 4, 0);
      assert.equal(p.length, 1);
      assert.equal(p[0].t, pieces.PieceType.OBELISK);
      assert.equal(p[0].c, pieces.Color.SILVER);
      assert.equal(p[0].o, pieces.Orientation.NONE);
    });
});