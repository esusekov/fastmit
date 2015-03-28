"use strict";

module.exports = /*@ngInject*/ function($scope, friendsService) {
    $scope.friends = friendsService.friends;
    //$scope.filteredFriends = friendsService.friends;

    //$scope.$watch('query.username', function(value) {
    //    if (value === undefined || value === '') {
    //        return $scope.filteredFriends = friendsService.friends;
    //    }
    //    $scope.filteredFriends = friendsService.filterFriendsByUsername(value);
    //});
};