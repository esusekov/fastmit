"use strict";

module.exports = /*@ngInject*/ function($scope, friendsService, $stateParams) {
    $scope.friends = [];
    $scope.users = [];

    $scope.noFriends = $stateParams.noFriends === 'noFriends';

    $scope.$watch('query.username', value => {
        if (value === undefined || value === '') {
            $scope.friends = [];
            return;
        }

        $scope.friends = friendsService.filterFriendsByUsername(value);
        friendsService.searchForUser(value).then(users => {
            $scope.users = users;
        });
    });

    //contactsService.load().then(function() {
    //    console.log(contactsService.contacts);
    //});
};