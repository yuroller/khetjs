'use strict';

describe('test ctrlMain', function () {

  // load the controller's module
  beforeEach(module('appKhet'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('ctrlMain', {
      $scope: scope
    });
  }));

  describe('quando premo "Nuova partita" ', function () {
    beforeEach(function(){
      scope.newGame();      
    });

    it('deve essere notificato "tocca a G1"',function(){    
      expect(scope.notification).toBe("tocca a G1");
    });

    it('può essere fatta una mossa',function(){    
      expect(scope.canMove()).toBe(true);
    })  
  });

  describe('validazione coordinate', function () {      
      it('se inserisco una stringa vuota deve notificare "formato non valido"',function(){    
        scope.move="";
        scope.go();
        expect(scope.notification).toBe("formato non valido");
      });    

      it('se inserisco "a1b1" deve notificare "mossa eseguita"',function(){    
        scope.move="a1b1";
        debugger;
        scope.go();
        expect(scope.notification).toBe("mossa eseguita");
      });    
    });
});
