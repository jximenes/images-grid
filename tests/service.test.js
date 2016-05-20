describe('images service', function(){
    beforeEach(module('services'));

    it('load', inject(function(imagesService, $httpBackend){
		imagesService.load().success(function(data, status){
			expect(status).toEqual(200);
			expect(data).toEqual({images: []});
		});

		$httpBackend
		    .when('GET', 'https://api.myjson.com/bins/29ja6')
		    .respond(200, { images:[] });
	  	$httpBackend.flush();
	}));
});

describe('utils service', function(){
    beforeEach(module('services'));

    it('get random number', inject(function(utils){
		expect(utils.getRandomNumber(5,8)).toBeGreaterThan(4);
		expect(utils.getRandomNumber(5,8)).toBeLessThan(9);
	}));
});
