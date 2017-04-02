angular.module('app.services', [])

.factory('FireBaseFactory', ["$firebaseArray",function($firebaseArray){
	var itemsRef = new Firebase("https://rotaract-msit.firebaseio.com/Users");
	return $firebaseArray(itemsRef);

}])

.service('FireBaseService', [function(){


}]);

