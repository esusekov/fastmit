"use strict";

module.exports = /*@ngInject*/ function($cordovaContacts, friendsFactory) {
    function makeFriendsListFromSource(sourceArray, type) {
        return sourceArray.map(source => friendsFactory.create(source, type));
    }

    function idCompare(a, b) {
        return a.id < b.id ? -1 : 1;
    }

    function contactToUser(data) {
        console.log(data);
        return {
            id: data.id,
            username: data.displayName || data.nickname,
            photoUrl: data.photos !== null && data.photos.length > 0 ? data.photos[0].value : undefined
        };
    }

    function hasName(data) {
        return data.displayName !== null || data.nickname !== null;
    }

    var contacts = [];

    return {
        get contacts() {
            return contacts;
        },

        load: function() {
            var options = {
                filter: '',
                multiple: true
            };

            return $cordovaContacts.find(options).then(contactsList => {
                console.log(contactsList);
                contacts = makeFriendsListFromSource(contactsList.filter(hasName).map(contactToUser));
            });
        }

    };
};