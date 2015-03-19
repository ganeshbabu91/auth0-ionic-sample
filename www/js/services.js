angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Goals', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var goals = [

  {
    name: 'UI Certification',
    id: '1',
    status: true, 
    isCompleted : false
  }, 
  {
    name: 'IBM Certification',
    id: '2',
    status: false,
    isCompleted : false
  }, 
  {
    name: 'Internal Certification',
    id: '3',
    status: true,
    isCompleted : true
  }, 
  {
    name: 'Should lead a small team',
    id: '4',
    status: false,
    isCompleted : true
  }
  
  ];

  return {
    all: function() {
      return goals;
    },
    remove: function(goal) {
      goals.splice(goals.indexOf(goal), 1);
    },
    get: function(goalId) {
      for (var i = 0; i < goals.length; i++) {
        if (goals[i].id === parseInt(goalId)) {
          return goals[i];
        }
      }
      return null;
    }
  };
})

.factory('UserScores', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var userScores = [

  {
    user: 'GANESH BABU',
    rank: '1',
    points: '150', 
    highlight : true,
    badges:[],
    imagelink:'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  }, 
  {
    user: 'DIVYA',
    rank: '2',
    points: '140', 
    highlight : false,
    badges:[],
    imagelink:'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  }, 
  {
    user: 'Karun',
    rank: '3',
    points: '130', 
    highlight : false,
    badges:[],
    imagelink:'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  }, 
  {
    user: 'DAVID',
    rank: '4',
    points: '120', 
    highlight : false,
    badges:[],
    imagelink:'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  }, 
  {
    user: 'SHARAN',
    rank: '5',
    points: '110', 
    highlight : false,
    badges:[],
    imagelink:'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  }, 
  {
    user: 'GURUNATHAN',
    rank: '6',
    points: '100', 
    highlight : false,
    badges:[],
    imagelink:'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  }, 
  {
    user: 'ARAVINDAN',
    rank: '7',
    points: '90', 
    highlight : false,
    badges:[],
    imagelink:'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  }, 
  {
    user: 'GOPAL',
    rank: '8',
    points: '50', 
    highlight : false,
    badges:[],
    imagelink:'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  }, 
  {
    user: 'RENESHA',
    rank: '9',
    points: '45', 
    highlight : false,
    badges:[],
    imagelink:'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  }
  
  ];

  return {
    all: function() {
      return userScores;
    }
  };
})

.factory('AvnetTags', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var avnetTags = [

      {text: "#APL", weight: 13, handlers:{
         click: function(e){
          console.log("e = %o",e);
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

  return {
    all: function() {
      return avnetTags;
    }
  };
});

