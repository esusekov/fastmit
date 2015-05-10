"use strict";

module.exports = /*@ngInject*/ function(UserModel, FriendModel, PotentialFriendModel) {
    return {
        create: function(source, type) {
            var friend;
            switch (type) {
                case 'friend':
                    friend = new FriendModel(source);
                    break;
                case 'potential':
                    friend = new PotentialFriendModel(source);
                    break;
                default:
                    friend = new UserModel(source);
            }
            return friend;
        }
    };
};
