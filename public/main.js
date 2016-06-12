const app = angular.module('app', ['angular.filter'])

  .config(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyBisZOil8vlEdcn85x3aPHQba4IBab-B2Y",
      authDomain: "votes-angular-tutorial.firebaseapp.com",
      databaseURL: "https://votes-angular-tutorial.firebaseio.com",
      storageBucket: "votes-angular-tutorial.appspot.com",
    });
  })

  .controller('MainCtrl', function ($scope, $timeout) {
    const main = this;

    main.heading = "Vote on stuff*";

    main.second = "*your vote is actually worthless";

    main.vote = function (id) {
      return firebase.database().ref(`/votes/${id}`)
        .transaction(current => {
          current.count += 1;
          return current;
        })
    }

    main.nominate = function (name) {
      firebase.database().ref('/votes')
        .push({name: name, count: 0})
        .then(() => main.nomination = '');
    }

    main.delete = function(id) {
      return firebase.database().ref(`vottes/${id}`)
        .set(null)
    }

    firebase.database().ref('/votes').on('value', (arg) => {
      main.data = arg.val();
      $timeout();
    })


  });


// angular.module('app', [])
//   .config(() => {
//     firebase.initializeApp({
//       apiKey: "AIzaSyBYdodUDrFtZ-1u3gXanz42eQnyU7_6J6s",
//       authDomain: "rock-da-vote.firebaseapp.com",
//       databaseURL: "https://rock-da-vote.firebaseio.com",
//       storageBucket: "rock-da-vote.appspot.com",
//     });;
//   })
//   .controller('MainCtrl', function ($scope) {
//     const main = this;;

//     main.heading = 'Rock the Vote!!!';;

//     main.curry = function () {
//       firebase.database().ref('/votes/curry')
//         .set(main.curryCount + 1);;
//     };;
//     main.bron = function () {
//       firebase.database().ref('/votes/bron')
//         .set(main.bronCount + 1);;
//     };;

//     firebase.database().ref('/votes').on('value', (snap) => {
//       const data = snap.val();; // {curry: 1, bron: 2}

//       main.curryCount = data.curry;;
//       main.bronCount = data.bron;;
//       $scope.$apply();;
//     });;