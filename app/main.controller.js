(function(){
  "use strict";

  angular
    .module('mainApp', ['services', 'directives'])
    .controller('mainController', ['$scope', 'imagesService', function($scope, imagesService){
      $scope.images = [];

      var imagesPromise = imagesService.load();
      imagesPromise.then(function(response) {
          var images = response.data && response.data.images;
          $scope.images = images || [];
        }, function(response) {
          var data = response.data || "Request failed";
          var status = response.status;
          console.log('Error: ' + status + ' - ' + data);
      });

    }])

})();
