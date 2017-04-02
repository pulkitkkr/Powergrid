// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic','ionic.service.core','app.controllers', 'app.routes', 'app.services', 'app.directives','firebase','ngCordova','ionic.service.analytics'])
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
})
.run(function($ionicPlatform,$cordovaLocalNotification,$rootScope, $ionicAnalytics) {

  $ionicPlatform.ready(function() {
 
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.setDefaults({
    title:  "Rotaract Club",
    text :"By Pulkit"
    });
   
    
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

   var io = Ionic.io();
   var push = new Ionic.Push({
    "onNotification" : function(notification){
      
    },
    "pluginConfig":{
      "android":{
        "ionColor":"#0000FF"
      }
    }
   });
   
   var user = Ionic.User.current();
   if(!user.id){
    user.id = Ionic.User.anonymousId();
   }
   user.set('name', user.id);
   user.save();
   
   var callback = function(data){
    push.addTokenToUser(user);
    user.save();
   }; 
   push.register(callback);    
    
  });
})



