'use strict';

angular.module("appKhet",[])
.controller("ctrlMain",["$scope",function($scope){
    var rows=["1","2","3","4","5","6","7","8"];
    var cols=["a","b","c","d","e","f","g","h","i","j"];
    $scope.notification='';
    $scope.players=[
      {name: "G1"},
      {name: "G2"}
    ];    
    $scope.curPlayer=-1;
    $scope.move="";

    function getCurGamer(){
      return "tocca a "+$scope.players[$scope.curPlayer].name;
    }

    function validateMove(){
      var m=$scope.move.split("");
      if (m.length!==4)
        return false;

      for (var i in m){
        if (i%2 === 0){
          if (cols.indexOf(m[i])<0) return false;

        }else{
          if (rows.indexOf(m[i])<0) return false;
        }
      }
      return true;
    }

    $scope.newGame=function(){
      $scope.curPlayer=0;      
      $scope.notification=getCurGamer();
    }

    $scope.go=function(){
      if (!validateMove()){
        $scope.notification="formato non valido";
      } else {
        $scope.notification = "mossa eseguita";
      }
    }

    $scope.canMove=function(){
      return ($scope.curPlayer>=0);
    }
}])


