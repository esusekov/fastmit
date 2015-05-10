"use strict";

module.exports = /*@ngInject*/ function($scope, contactsService, friendsService) {
    $scope.friends = friendsService.friends;
    $scope.filteredFriends = [];

    $scope.$watch('query.username', function(value) {
        if (value === undefined || value === '') {
            $scope.filteredFriends = [];
            return;
        }

        var lowercasedValue = value.toLowerCase();

        $scope.filteredFriends = $scope.friends.filter(friend => friend.username.toLowerCase().indexOf(lowercasedValue) >= 0);
    });

    //contactsService.load().then(function() {
    //    console.log(contactsService.contacts);
    //});
};