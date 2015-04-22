var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

var room = urlParams['room'];

var url ="http://pakytro.firebaseio.com/"+urlParams['room'];

var pensatroApp = angular.module('pensatroApp', ["firebase"]);

pensatroApp.controller('collabController', function ($scope, $firebaseObject, $firebaseArray){
	var data = new Firebase(url);
	var sync = $firebaseObject(data);
	var chatRef = new Firebase(url+"/chat");
	$scope.chat = $firebaseArray(chatRef);
	sync.$bindTo($scope, "data");
     
    $scope.sendChatMessage = function (){
        var user = document.getElementById("chatname").value;
        var message = document.getElementById("chatmsg").value;
        document.getElementById("chatmsg").innerHTML = '';
        $scope.chat.$add({user: user, text: message, timestamp: Firebase.ServerValue.TIMESTAMP});
    };
});	


