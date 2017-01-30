angular.module('gvconsole')
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

angular.module('gvconsole')
 .service('ConfigService', ['$http', function($http){

	 	var endpoint = 'http://localhost:8181/cxf';

		this.getServices = function(){
			 return $http.get(endpoint+'/gvesb');
		}
		
		this.getConfigInfo = function() {
			return $http.get(endpoint+'/gvconfig/deploy')
		}
		
		this.deploy = function(config, id){
	        var fd = new FormData();
	        fd.append('gvconfiguration', config);
	       
	        return $http.post(endpoint+'/gvconfig/deploy/'+id, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': 'multipart/form-data'}
	        });
	    }
		
		this.getConfig = function(id) {
			return $http({
				method: 'GET',
			    url: endpoint + '/gvconfig/deploy/' + id,		        
		        responseType: 'arraybuffer'
			});
		}

 }]);

angular.module('gvconsole')
.controller('ConfigController',['ConfigService' ,'$scope', '$location', function(ConfigService, $scope, $location){

	var instance = this;

	this.alerts = [];

	this.services = {};
	
	this.configInfo = {};
	
	this.deploy = {};
	
	this.deployConfiguration = function (){
		
		$scope.deployInProgress = true;
		
		ConfigService.deploy(instance.deploy.configfile, instance.deploy.id)
		.then(function(response) {
			$scope.deployInProgress = false;
			instance.deploy = {};
			instance.loadConfigInfo();
			instance.alerts.push({type: 'success', msg: 'Configuration deployed successfully'});
		}, function(response){
			switch (response.status) {

			case 401: case 403:
				$location.path('login');
				break;

			default:
				$scope.deployInProgress = false;
				instance.alerts.push({type: 'danger', msg: 'Configuration deploy failed'});
				break;
			}
		});
	}
	
	this.loadConfigInfo = function() {
	
		ConfigService.getConfigInfo().then(
				function(response){
					
					instance.configInfo = response.data;
				},
				function(response){
					switch (response.status) {
	
							case 401: case 403:
								$location.path('login');
								break;
	
							default:
								instance.alerts.push({type: 'danger', msg: 'Data not available'});
								break;
					}
		});
	
	}
	
	this.exportConfig = function (name) {

		ConfigService.getConfig(instance.configInfo.id)
			.then( function(response) {
				
				var linkElement = document.createElement('a');

				try {

					var blob = new Blob([response.data], { type: 'application/zip' });
					var url = window.URL.createObjectURL(blob);
					linkElement.setAttribute('href', url);
	                linkElement.setAttribute("download", instance.configInfo.id+'.zip');
	                
	                var clickEvent = new MouseEvent("click", {
	                	"view": window,
	                	"bubbles": true,
	                	"cancelable": false
	                });
	                linkElement.dispatchEvent(clickEvent);

				} catch (ex) {
					instance.alerts.push({type: 'danger', msg: 'Export fail'});
					console.log(ex);

				}

			}, function (responses) {
				instance.alerts.push({type: 'danger', msg: 'Export fail'});
			});

	}

}]);

