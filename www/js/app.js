// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
//angular.module('starter', ['ionic','starter.controllers','starter.admin'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
		.state('index',{
		url: '/index',
		templateUrl: 'templates/menu.html',
		//controller: 'AppCtrl'
	})

		.state('history',{
		url: '/history',
		templateUrl: 'templates/history.html',
		controller: 'AppCtrl'
	})

		.state('Insert',{
		url: '/Insert',
		templateUrl: 'templates/Insert.html',
		controller: 'AdminCtrl'
	})
		.state('edit',{
		url: '/edit',
		templateUrl: 'templates/edit.html',
		controller: 'EditCtrl'

	})
		.state('Del',{
		url: '/Del',
		templateUrl: 'templates/Del.html',
		controller: 'DeleteCtrl'
	})
		.state('Search',{
		url: '/Search',
		templateUrl: 'templates/Search.html',
		controller: 'AppCtrl'
	})

		.state('list',{
		url: '/list',
		templateUrl: 'templates/list.html',
		controller: 'PlaylistCtrl'
	})

		.state('login',{
		url: '/login',
			templateUrl: 'templates/login.html',
		controller: 'AppCtrl'
	})
	$urlRouterProvider.otherwise('/login');
})


 .controller('AppCtrl',function ($scope,$state,$ionicPopup,$http,$ionicHistory) {
  var url="http://localhost/ionic_php/";
  $scope.login={};
 $scope.doLogin=function(){
   
      var admin_user=$scope.login.username;
      var admin_password=$scope.login.password;
      console.log(admin_user);
      if(admin_user && admin_password){
          str=url+"login.php?username="+admin_user+"&password="+admin_password;
          $http.get(str)
            .success(function(response){

                $scope.admin=response.records;
                sessionStorage.setItem('loggedin_status',true);
                sessionStorage.setItem('loggedin_id',$scope.admin.admin_id);
                sessionStorage.setItem('loggedin_status',$scope.admin.admin_user);

                $ionicHistory.nextViewOptions({
                  disableAnimate:true,
                  disableBack:true
                })

                $ionicPopup.alert({
                  title:'login',
                  template:'Success !!!!'
                })

                $state.go('list',{},{location:"replace",reload:true});
            })
            .error(function(){

              $ionicPopup.alert({
                title:'login',
                template:'No login please check !!!!'
              })
            });

      }else{
        $ionicPopup.alert({
          title:'login',
          template:'Please check !!!!'
        })

      }

  }
})


.controller('PlaylistCtrl',function($scope){
	$scope.datalist=[
	{fname:"PHOT",lname:"Rap is now",pic:"img/3.jpg"},
	{fname:"YOUNGOHM",lname:"Rap is now",pic:"img/4.jpg"},
	{fname:"KQ",lname:"Rap is now",pic:"img/5.jpg"},
	{fname:"HASSDIN",lname:"Rap is now",pic:"img/6.jpg"},
	{fname:"OAK",lname:"Rap is now",pic:"img/7.jpg"},
	{fname:"MC-KING",lname:"Rap is now",pic:"img/8.jpg"},
];
})

.controller('PlaylistCtrl',function($scope,$http){
	$scope.datalist=[];
	$scope.url="http://localhost/ionic_php/loaddata.php";
	$http.get($scope.url)
		.success(function(data){
		$scope.datalist=data;
	})
		.error(function(data){
		console.log("error");
	});
})
	.controller('AdminCtrl',function($scope,$http){
	 var url="http://localhost/ionic_php/";
	$scope.adminData=[];
    $scope.createAdmin=function(){
      var admin_user=$scope.adminData.admin.username;
      var admin_password=$scope.adminData.admin.password;
      console.log(admin_user);
	str= url + "admin-insert.php?username=" + admin_user + "&password=" + admin_password ;
	$http.get(str)
		.success(function(data){
		if(data == true){
			console.log("ok");
		}
	})
		.error(function(data){
		console.log("error");
	});
	}
	})
	.controller('EditCtrl',function($scope,$http){
	 var url="http://localhost/ionic_php/";
	$scope.editData=[];
    $scope.editAdmin=function(){
	var admin_id=$scope.editData.admin.id;
    var admin_user=$scope.editData.admin.user;
    var admin_password=$scope.editData.admin.password;
      console.log(admin_user);
	str= url + "admin-edit.php?id=" + admin_id + "&username=" + admin_user + "&password=" + admin_password ;
	$http.get(str)
		.success(function(data){
		if(data == true){
			console.log("ok");
		}
	})
		.error(function(data){
		console.log("error");
	});
	}
	})
	.controller('DeleteCtrl',function($scope,$http){
	 var url="http://localhost/ionic_php/";
	$scope.delData=[];
    $scope.delAdmin=function(){
	var admin_id=$scope.delData.admin.id;
      console.log(admin_id);
	str= url + "admin-del.php?id=" + admin_id ;
	$http.get(str)
		.success(function(data){
		if(data == true){
			console.log("ok");
		}
	})
		.error(function(data){
		console.log("error");
	});
	}
	})