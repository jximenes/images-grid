(function(){
  "use strict";

  angular
    .module('services', [])
    .service('imagesService', ['$http',function($http){

      // this url could be load from a config file
      var IMAGES_URL = "https://api.myjson.com/bins/29ja6";

      // returns a promise
      function load(url){
        //url received parameter. Default value IMAGES_URL
        url = url || IMAGES_URL;

        return $http.get(url);
      }

      return {
        load: load
      }

    }])

})();
