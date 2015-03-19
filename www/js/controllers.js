angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, auth, $state, store) {
  function doAuth() {
    auth.signin({
      closable: false,
      // This asks for the refresh token
      // So that the user never has to log in again
      authParams: {
        scope: 'openid offline_access'
      }
    }, function(profile, idToken, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      alert("accessToken = "+accessToken);
      store.set('at',profile.identities[0].access_token);
      $state.go('app.home');
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }

  $scope.$on('$ionic.reconnectScope', function() {
    doAuth();
  });

  doAuth();
  
  
})

.controller('DashCtrl', function($scope, $http, store) {
  alert("profile identities = "+JSON.stringify(store.get('profile').identities[0], null, 4));
  alert("profile access token = "+store.get('profile').identities[0].access_token);
  var accessToken = store.get('profile').identities[0].access_token;

  $scope.postToYammer = function() {
    var req = {
     method: 'POST',
     url: 'https://www.yammer.com/api/v1/messages.json',
     headers: {
       'Authorization': 'Bearer '+accessToken
     },
     data: { 
        'body': 'posting status from android app - testing!!!', 
        'group_id': 4720489,
        'accessToken': accessToken
     }
    };
    $http(req).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      alert("msg posted "+status);
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert("error "+status);
    });
  };

})

.controller('GoalsCtrl', function($scope, $http, store, Goals) {
   $scope.goals = Goals.all();
   console.log("Before submit : "+JSON.stringify($scope.goals, null, 4));
   $scope.submitGoals = function(){
      console.log("After submit "+JSON.stringify($scope.goals, null, 4));
   };
})

.controller('LeaderboardCtrl', function($scope, $http, store, UserScores) {
   $scope.userScores = UserScores.all();
})

.controller('AvnetplayCtrl', function($scope, $http, $state, store, AvnetTags) {
   //$scope.words = AvnetTags.all();
   var avnetTags = [

      {text: "#APL", weight: 13, handlers:{
         click: function(e){
          console.log("e = %o",e);
          $state.go('app.home');
          alert("clicked apl");
        }
      }},
      {text: "#TT", weight: 10.5,  handlers:{
        click: function(){
          alert("clicked tt");
        }
      }},
      {text: "#Outing", weight: 9.4},
      {text: "#Carom", weight: 8},
      {text: "#party", weight: 6.2},
      {text: "#indoor", weight: 5},
      {text: "#C&G", weight: 11},
      {text: "#fifa", weight: 5},
      {text: "#pantry", weight: 5}
  
  ];
  $scope.words = avnetTags;
   $scope.colors = ["#800026", "#bd0026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976"];
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, auth, store, $state) {
  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login', {}, {reload: true});
  };
});
