(function(){
  "use strict";

  angular
    .module('directives', ['services', 'wu.masonry'])
  	.constant('DEFAULTS', {
  		MINIMUM_IMAGES : 50,
  		IMAGE_WIDTH : 300,
  		IMAGE_HEIGHT_MIN : 150,
  		IMAGE_HEIGHT_MAX : 600,
  		BOTTOM_OFFSET : 300
  	})
    .directive('imagesGrid', [ '$timeout', '$window', 'utils', 'DEFAULTS' , function($timeout, $window, utils, DEFAULTS){
      var directive = {
        restrict: 'E',
        scope: {
          images: '='
        },
        template: "<span class='count'>{{loadedImages.length}}</span><div class='grid-container' masonry><div class='item-container masonry-brick' ng-repeat='imageInfo in loadedImages'><img  at='{{$index}}' class='grid-item' src='{{imageInfo.url}}' alt='{{imageInfo.name}}' style='height:{{imageInfo.height}}px;' ng-click='removeImage(imageInfo)'/></div></div>",
        controller:['$scope', function($scope){
          $scope.loadedImages = [];
          $scope.removeImage = function(item){
            if(item){
              var itemIdx = $scope.loadedImages.indexOf(item);
              if(itemIdx!==-1){
                $scope.loadedImages.splice(itemIdx,1);
              }
            }
          }
        }],
        compile: function(element, attributes){
          return {
            pre: function(scope, element, attributes, controller, transcludeFn){
            },
            post: function(scope, element, attributes, controller, transcludeFn){
				var currentIndex = 0;

				var imagesContainerElement = $(element).children('div.grid-container')[0];

				var watchImages = scope.$watch('images', updateImages);
				var watchLoadedImages = scope.$watchCollection('loadedImages', tryAddNewImage);

				// bind scroll event to load more images
				angular.element($window).bind("scroll", function() {
					tryAddNewImage();
				});

				// bind resize event to load more images
				angular.element($window).bind("resize", function() {
					tryAddNewImage();
				});

				function updateImages(){
					if(scope.images && scope.images.length>0){
					  //when scope.images is valid, remove the watcher
					  if(watchImages){ watchImages(); }

					  tryAddNewImage();
					}
				}

				function tryAddNewImage(){
					if(isToAddImage()){
						var itemToAdd = getCurrentImage();
					  	if(itemToAdd){
					    	itemToAdd.height = utils.getRandomNumber(DEFAULTS.IMAGE_HEIGHT_MIN, DEFAULTS.IMAGE_HEIGHT_MAX);
					    	itemToAdd.width = DEFAULTS.IMAGE_WIDTH;
							if(currentIndex>=scope.images.length){
								currentIndex=0;
							}
						    //timeout with 0 to shift the push to the end of the event queue
						    $timeout(function(){
						    	scope.loadedImages.push(itemToAdd);
						    }, 0);
					  	}
					}
				}

				function getCurrentImage(){
					if(scope.images && scope.images.length>0){
						var currObj = scope.images[currentIndex++];
						return angular.copy(currObj);
					}
				}

				//check if the image
				function isToAddImage(){
					var $elem = $(imagesContainerElement);
					return ($elem.offset().top + $elem.height() - DEFAULTS.BOTTOM_OFFSET) < ($window.pageYOffset + $window.innerHeight) || (scope.loadedImages.length<DEFAULTS.MINIMUM_IMAGES);
				}
            }
          }
        }
      };

      return directive;
    }]);
})();
