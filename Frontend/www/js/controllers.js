angular.module('starter.controllers', [])

.controller('FeedCtrl', ['$scope' , '$cordovaOauth', '$location' , '$http' , '$window', 'UserAPI' ,  function($scope , $cordovaOauth , $location , $http , $window ,
    UserAPI) {

    // $scope.login = function() {
    //     $cordovaOauth.facebook("877800308993381", ["email", "user_website", "user_location", "user_relationships"]).then(function(result) {
    //         $localStorage.accessToken = result.access_token;
    //     }, function(error) {
    //         alert("There was a problem signing in!  See the console for logs");
    //         console.log(error);
    //     });
    //
    //     $location.url('/profile');
    //
    // };

    //console.log('imageHolder is: ' + $scope.imageHolder.name );

}])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope , $ionicPopup , UserAPI , $http , $firebaseArray , $cordovaCamera , $ionicLoading) {

    var itemsRef = new Firebase("https://images-10387.firebaseio.com/Images");

    $scope.upload = function() {
        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.PNG,
          targetWidth: 65,
          targetHeight: 65,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
    	  correctOrientation:true
        };
        //success function
        $cordovaCamera.getPicture(options).then(function(imageData) {

            $ionicLoading.show({
              template: 'Uploading...',
              duration: 1000
            });


            var itemsRef = new Firebase("https://images-10387.firebaseio.com/Images");

            $scope.items = $firebaseArray(itemsRef);
            /* We need to wait for the list to load first and then we grab ... This solves the problem of 'id' just add a scope.*/
            $scope.items.$add({
                name: 'Ben' ,
                data: imageData
            }).then( function(ref) {
                $scope.id = "";

                $scope.id = ref.key();
                var list = $firebaseArray(itemsRef);
                list.$loaded().then( function( arr) {
                    // alert('hold is:  ' + $scope.hold );
                    $scope.hold = arr.$getRecord($scope.id).data;
                    // alert('hold is:  ' + $scope.hold );
                });
            });
        //failure function
        }, function(err) {
            alert("We have an error: " + error );
        });

    }


})
.controller('SignInCtrl' , function($scope , $cordovaOauth , UserAPI , $state) {

    // $scope.login = function() {
    //     console.log("adding user ... ");
    //     UserAPI.addUser();
    //     $cordovaOauth.facebook("877800308993381", ["email", "user_website"]).then(function(result) {
    //         $localStorage.accessToken = result.access_token;
    //
    //     }, function(error) {
    //         alert("There was a problem signing in!  See the console for logs");
    //         console.log(error);
    //     });
    //
    // };

    $scope.lol = function() {
        console.log("Lol");
        $state.go('tab.account');
    }

    $scope.userInfo = {
        email: "",
        password: ""
    }

    $scope.login = function() {
        console.log($scope.userInfo);
        var dang = {};
        UserAPI.loginUser($scope.userInfo).success( function(result) {
            if( result ) {
                console.log('result is: ' + result.email );
            } else {
                console.log('Could not grab user ... ' );
            }
        });
    }


})
.controller('SignUpCtrl' , function( $scope , UserAPI) {

    $scope.user = {
        first: "" ,
        last: "" ,
        school: "" ,
        email: "" ,
        password: ""
    }

    $scope.done = function() {
        $scope.user.school = $scope.user.school.toUpperCase();
        console.log($scope.user);
        UserAPI.addUser($scope.user);
    }


})
.controller('SellerCtrl' , function( $scope ) {

    console.log('In Seller');

    $scope.categoryOne = [ {id:'1' , name:'Sports' , selected:'false'} , {id:'2' , name:'Electronics' , selected:'false'} , { id: '3' , name:'Movies' , selected:'false'} ,
    { id:'4' , name:'Music' , selected:'false'} , { id: '5' , name:'Leisure' , selected:'false'} ];

    $scope.categoryTwo = [ 'Textbooks' , 'Fashion' , 'Clothes' , 'Other'];

    $scope.selectCategoryOne = function(selectedItem) {
        for(var i = 0; i < $scope.categoryOne.length; i++) {
            var item = $scope.categoryOne[i];
            if(item.id == selectedItem.id){
                item.selected = !item.selected;
            }else {
                item.selected = true;
            }
        }
    }

    $scope.selectCategoryTwo = function(selectedItem) {
        console.log('You just chose: ' + selectedItem );
    }

});
