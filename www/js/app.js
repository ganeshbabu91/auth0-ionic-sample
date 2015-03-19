// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 
  'starter.controllers', 
  'starter.services',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'angular-jqcloud'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, authProvider,
  jwtInterceptorProvider, $httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  // Login State
  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })

  // Setup sidemenu template as abstract navigation
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    data: {
      requiresLogin: true
    }
  })

  // Setup side menus
  // HOME
  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: 'templates/sidemenu/home.html',
      }
    }
  })

  // CAREER
  .state('app.career', {
    url: "/career",
    views: {
      'menuContent': {
        templateUrl: 'templates/career.html',
      }
    }
  })

  // AVNET PLAY
  .state('app.avnetplay', {
    url: "/avnetplay",
    views: {
      'menuContent': {
        templateUrl: 'templates/sidemenu/avnetplay.html',
        controller: 'AvnetplayCtrl'
      }
    }
  })

  // GAMES
  .state('app.games', {
    url: "/games",
    views: {
      'menuContent': {
        templateUrl: 'templates/sidemenu/games.html',
      }
    }
  })

  // LEADERBOARD
  .state('app.leaderboard', {
    url: "/leaderboard",
    views: {
      'menuContent': {
        templateUrl: 'templates/sidemenu/leaderboard.html',
        controller: 'LeaderboardCtrl'
      }
    }
  })

  // APPROVAL
  .state('app.approval', {
    url: "/approval",
    views: {
      'menuContent': {
        templateUrl: 'templates/sidemenu/approval.html',
      }
    }
  })

  // CAREER TABS
  // GOALS
  .state('app.career.goals', {
    url: '/goals',
    views: {
      'tab-goals': {
        templateUrl: 'templates/career/tab-goals.html',
        controller: 'GoalsCtrl'
      }
    }
  })

  // PROJECTS
  .state('app.career.projects', {
    url: '/projects',
    views: {
      'tab-projects': {
        templateUrl: 'templates/career/tab-projects.html',
        controller: 'DashCtrl'
      }
    }
  })

  // ASSETS
  .state('app.career.assets', {
    url: '/assets',
    views: {
      'tab-assets': {
        templateUrl: 'templates/career/tab-assets.html',
        controller: 'DashCtrl'
      }
    }
  })

  // PRESENTATIONS
  .state('app.career.presentations', {
    url: '/presentations',
    views: {
      'tab-presentations': {
        templateUrl: 'templates/career/tab-presentations.html',
        controller: 'DashCtrl'
      }
    }
  })

  // CODES N GEARS
  .state('app.career.cng', {
    url: '/cng',
    views: {
      'tab-cng': {
        templateUrl: 'templates/career/tab-cng.html',
        controller: 'DashCtrl'
      }
    }
  });

  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/home');

  // Configure Auth0
  authProvider.init({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    loginState: 'login'
  });

  jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
    var idToken = store.get('token');
    var refreshToken = store.get('refreshToken');
    var accessToken = store.get('accessToken');
    if (!idToken || !refreshToken) {
      return null;
    }
    if (jwtHelper.isTokenExpired(idToken)) {
      return auth.refreshIdToken(refreshToken).then(function(idToken) {
        store.set('token', idToken);
        return idToken;
      });
    } else {
      return idToken;
    }
  }

  $httpProvider.interceptors.push('jwtInterceptor');

}).run(function($rootScope, auth, store) {
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        auth.authenticate(store.get('profile'), token);
      }
    }

  });
});
