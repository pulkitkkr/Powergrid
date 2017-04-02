angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope,$ionicPopup,$firebaseAuth, $location,$rootScope, $ionicLoading) {


  
 
  $scope.EnterPowerGrid = function(username,password){
     
      $ionicLoading.show({
        template: 'Please Wait...'
       });
     



       
			var FB = new Firebase("https://powergrid.firebaseio.com/");
  		 	var fbAuth = $firebaseAuth(FB);
  	   		fbAuth.$authWithPassword({
           		email: username,
            	password: password
        	}).then(function(authData) {
           		$rootScope.UserLoggedIn = username;
             $ionicLoading.hide();
           
              $rootScope.UserLoggedIn = username;
              $location.path("/home/notice").replace();
             
       		}).catch(function(error) {
            	console.error("ERROR: " + error);
            	 $ionicLoading.hide();
                $ionicPopup.alert({
    					title: 'Sorry!!',
     					template: error

   					});

        });
	}
	 
})

 .controller('avatarCtrl',function($scope,$rootScope, $ionicHistory){
   $scope.SelectionMade = function(index){
    $rootScope.selectedAvatar = index + 1;
    $rootScope.LaunchButton="Selected";
    $rootScope.myClassx.pop('button-assertive');
    $rootScope.myClassx.push('button-balanced');
     
     window.history.back();
   }
   


  $scope.imgx = [1,2,3,4,5,6,7,8,9,13,14,15,16,17,18,19,20,21,22];
 }) 

.controller('signupCtrl', function($scope,$rootScope, $ionicPopup,FireBaseFactory,$firebaseAuth,$ionicLoading, $location) {
  $scope.Data =  new Firebase("https://powergrid.firebaseio.com/Users");
  $scope.spinnerShow = false;
  var FB = new Firebase("https://powergrid.firebaseio.com/");
     
 
  
  var register = function(username,password,name,tel,Position){
    $ionicLoading.show({
      template: 'Please Wait...'
    });
    var fbAuth = $firebaseAuth(FB);
        fbAuth.$createUser({email: username, password: password}).then(function() {
            return fbAuth.$authWithPassword({
                email: username,
                password: password
            });
        }).then(function(authData) {

           $scope.Data.push({
          "Name": name,
          "UserName": username,
          "Password": password,
          "Phone": tel,
          "Position" : Position
        },function oncomplete(){
          $ionicPopup.alert({
              title: 'Congrats!!',
              template: 'You are Now Registered!!! Welcome To Powergrid Corporation Of India'

            });
          });
          $ionicLoading.hide();   
          $location.path("/login"); 
        }).catch(function(error) {
            console.error("ERROR " + error);
            $ionicPopup.alert({
              title: 'Sorry!!',
              template: error+' Unable to Register,We Regret for inconvenience'

            });
            $ionicLoading.hide();
        });

  }
  $scope.submitForm = function(FormData) {
      
      if(FormData.UserName && FormData.Name && FormData.Pass && FormData.Tel && FormData.Position){
          register(FormData.UserName, FormData.Pass,FormData.Name,FormData.Tel,FormData.Position);
                    
        FormData = null;
                
      }
      else{
        $ionicPopup.alert({
             title: 'Error!!!',
              template: 'Make Sure You have filled all fields Correctly'

            });
        
     }

  }
   

})

   
.controller('rotaractMembersCtrl', function($rootScope,$scope,$timeout) {

    $rootScope.Users = [];
    $rootScope.MemberSelected=0;
    var ref = new Firebase("https://powergrid.firebaseio.com/Users");
    ref.on("child_added", function(snapshot, prevChildKey) {
      var CurrentUser = snapshot.val();
      var pushData = {};
      pushData.Name = CurrentUser.Name;
      pushData.Tel = CurrentUser.Phone;
      pushData.UserName = CurrentUser.UserName;
      pushData.Position = CurrentUser.Position;
      pushData.ProfileImagex ='img/User.png';
      
      $rootScope.Users.push(pushData);
         
    }, undefined, undefined);

    $scope.ShowUserDetails = function(index){
      
      $rootScope.MemberSelected = index;
    }
    
    
    $scope.Showusers = function(){
      $rootScope.Users = [];
      var ref = new Firebase("https://rotaract-msit.firebaseio.com/Users");
      ref.on("child_added", function(snapshot, prevChildKey) {
      var CurrentUser = snapshot.val();
      var pushData = {};
      pushData.Name = CurrentUser.Name;
      pushData.Tel = CurrentUser.Phone;
      pushData.UserName = CurrentUser.UserName;
      pushData.Course = CurrentUser.Course;
      pushData.Year = CurrentUser.Year;
      pushData.Shift = CurrentUser.Shift;
      pushData.Position = CurrentUser.Position;
      if(CurrentUser.ProfileImage)
      {

      pushData.ProfileImagex = CurrentUser.ProfileImage;
       
      }
      else{
        pushData.ProfileImagex ='img/User.png';
      }
      $rootScope.Users.push(pushData);
         
    }, undefined, undefined);
      
      $scope.$broadcast('scroll.refreshComplete');

      scope.$apply();


    }

  
  

})
   
.controller('noticesCtrl', function($ionicLoading,$cordovaVibration,$ionicPlatform,$cordovaLocalNotification,$scope,$rootScope, $cordovaImagePicker,$rootScope, $cordovaCamera, $ionicPopup,FireBaseFactory) {
    $scope.InView= true;
    $scope.InAdd = false;

  $scope.AddNoticeToggle = function(){
    alert('opening add notice toggle');
    $scope.InAdd = true;
    $scope.InView = false;
  };
  $scope.ViewNoticeToggle = function(){
    $scope.InView= true;
    $scope.InAdd = false;
  };
  $rootScope.PostData = [];
  
    var ref = new Firebase("https://powergrid.firebaseio.com/Posts");

    ref.on("child_added", function(snapshot, prevChildKey) {
      var CurrentUser = snapshot.val();
      var pushData = {};
      pushData.titlex = CurrentUser.title;
      pushData.contentx = CurrentUser.content;
            
      $rootScope.PostData.unshift(pushData);
         
    }, undefined, undefined); 



  $scope.submitPost = function(PostForm)
  {
    $ionicLoading.show({
        template: 'Please Wait...Contacting Servers...it may take upto 60 seconds, Please Do not close the App'
       });
    $scope.Post =  new Firebase("https://powergrid.firebaseio.com//Posts");
    $scope.PostCount =  new Firebase("https://powergrid.firebaseio.com/PostsCount");
   
   // alert($rootScope.ImageData);
    if (PostForm.password=="POWERGRID123") {
      
      $scope.Post.push({
          "title": PostForm.titlex,
          
          "content": PostForm.contentx
        },function oncomplete(){
          $ionicLoading.hide();
          

          $ionicPopup.alert({
              title: 'Congrats!!',
              template: 'Post SuccessFully Uploaded To Servers'

            });
          });
      $scope.PostCount.push({
          "title": PostForm.titlex,
         
        },function oncomplete(){

         
          });

    }
    else
    {
      $ionicLoading.hide();
      $ionicPopup.alert({
              title: 'Error!!',
              template: "Admin Key isn't Correct, Please Check and Try Again Later"

            });
    }
    
  }
   
    
     
})
.controller('ViewUserCtrl', function($scope, $rootScope){
  $scope.SelectedData="";
   $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
  viewData.enableBack = true;
   $scope.SelectedData = $rootScope.Users[$rootScope.MemberSelected];
}); 
  


    
})
 .controller('avatarxCtrl',function($scope,$rootScope, $ionicHistory){
   $scope.imgx = [1,2,3,4,5,6,7,8,9,13,14,15,16,17,18,19,20,21,22,23];
   $scope.SelectionMade = function(index){
   $rootScope.ProfileSelectedAvatar = index + 1;
      
     window.history.back();
   }

   })   
.controller('myProfileCtrl', function($rootScope,$state,$cordovaLocalNotification, $ionicPlatform, $firebaseArray,$cordovaDevice,$scope,$ionicPopup,$rootScope,$location,$cordovaInAppBrowser) {
      $rootScope.MyProfileInit = function () {
         var ref = new Firebase("https://powergrid.firebaseio.com/Users");
         var ProfileData = {};
         var pushData = {};
         if(!$rootScope.UserLoggedIn){
          console.log("No user was logged in setting it to abcd");
          $rootScope.UserLoggedIn = "abcd@gmail.com";
         }
         ref.on("child_added", function(snapshot, prevChildKey) {
         var CurrentUser = snapshot.val();
          if($rootScope.UserLoggedIn==CurrentUser.UserName){
              pushData.Name = CurrentUser.Name;
              pushData.UserName = CurrentUser.UserName;
              pushData.Tel = CurrentUser.Phone;
              pushData.Position = CurrentUser.Position;
          }
        }, undefined, undefined); 
         if(pushData){
             console.log(pushData);
             $rootScope.PresentUser=pushData; 
            $location.path("/home/User_Profile").replace();
          }
          else{
            console.log( "ProfileData not found");
           } 

      };
     $rootScope.MyProfileInit();
    $scope.$on('$stateChangeSuccess', function () {
      var ref = new Firebase("https://powergrid.firebaseio.com/Users");
         var ProfileData = {};
         var pushData = {};
         if(!$rootScope.UserLoggedIn){
          console.log("No user was logged in setting it to abcd");
          $rootScope.UserLoggedIn = "abcd@gmail.com";
         }
         ref.on("child_added", function(snapshot, prevChildKey) {
         var CurrentUser = snapshot.val();
          if($rootScope.UserLoggedIn==CurrentUser.UserName){
              pushData.Name = CurrentUser.Name;
              pushData.UserName = CurrentUser.UserName;
              pushData.Tel = CurrentUser.Phone;
              pushData.Position = CurrentUser.Position;
          }
        }, undefined, undefined); 
         if(pushData){
             console.log(pushData);
             $rootScope.PresentUser=pushData; 
           // $location.path("/home/User_Profile").replace();
          }
          else{
            console.log( "ProfileData not found");
           } 
  
    });
  $scope.SignOut = function(){
    $rootScope.UserLoggedIn=undefined;
    $rootScope.PresentUser=undefined;
    
    $location.path('#/login');
  };
})
    