Frases = new Mongo.Collection('frases');


if (Meteor.isClient) {

Accounts.config({
  forbidClientAccountCreation: false,
});

Accounts.ui.config({
     passwordSignupFields: "USERNAME_ONLY"
   });


  // This code only runs on the client
  angular.module('JuegoFrases',['angular-meteor', 'accounts.ui']);

//controller listaFrases
  angular.module('JuegoFrases').controller('listaFrases', ['$scope', '$meteor',
      function ($scope, $meteor) {


        // funciona para retornar las frases ordenadas, adicionalmente
        //relaciona el modelo en el html con el modelo de mongo db :  ng-repeat="frase in frases"
        $scope.frases = $meteor.collection( function() {
        return Frases.find({}, { sort: {"frase.palabraClave": 1 } })
                                                        }
      );

          //funcion para agregar una frase
      $scope.agregarFrase =  function(nuevaFrase) {
                              var cantidad = Frases.find ({"frase.palabraClave":nuevaFrase.palabraClave}).count()
                              if (cantidad ===0)
                              $scope.frases.push({nuevaFrase});
                            };

        //funcion para eliminar una frase ya cargada
        $scope.eliminarFrase = function (id) {
          if (confirm("Borrar?")) {
              $scope.frases.remove({_id:id});
            }
        };





        }]);
//fin del codigo del controller listaFrases

};
