(function(){
  "use strict";

  angular
    .module('services')
    .service('utils', [function(){

		// function that returns a random number between min and max
		function getRandomNumber(min, max){
			min = min || 0;
			max = max || 1;
		  	return Math.floor(Math.random()*(max-min+1)+min);
	  	}

      return {
        getRandomNumber: getRandomNumber
      }

    }])

})();
