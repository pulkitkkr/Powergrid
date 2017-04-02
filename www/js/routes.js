angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('signup', {
      url: '/signUp',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })


     .state('avatar', {
      url: '/avatar',
      templateUrl: 'templates/avatar.html',
      controller: 'avatarCtrl'
    })

        .state('avatarx', {
      url: '/avatarx',
      templateUrl: 'templates/avatarx.html',
      controller: 'avatarxCtrl'
    })


     .state('viewuser', {
      url: '/viewuser',
      templateUrl: 'templates/viewuser.html',
      controller: 'ViewUserCtrl'
    })
        
      
    
      
        
    .state('rotaractMSIT.rotaractMembers', {
      url: '/members',
      views: {
        'tab4': {
          templateUrl: 'templates/rotaractMembers.html',
          controller: 'rotaractMembersCtrl'
        }
      }
    })
        
      
    
      
        
    .state('rotaractMSIT.notices', {
      url: '/notice',
      views: {
        'tab5': {
          templateUrl: 'templates/notices.html',
          controller: 'noticesCtrl'
        }
      }
    })
        
      
    
      
        
    .state('rotaractMSIT.myProfile', {
      url: '/User_Profile',
      views: {
        'tab6': {
          templateUrl: 'templates/myProfile.html',
          controller: 'myProfileCtrl'
        }
      }
    })
        
      
    
      
    .state('rotaractMSIT', {
      url: '/home',
      abstract:true,
      templateUrl: 'templates/rotaractMSIT.html'
    })
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});