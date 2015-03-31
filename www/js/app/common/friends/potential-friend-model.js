"use strict";

module.exports = /*@ngInject*/ function(UserModel) {

    function PotentialFriend(source) {
        UserModel.call(this, source);
        this.__in = source.in || false;
        this.__out = source.out || false;
    }

    PotentialFriend.prototype = Object.create(UserModel.prototype, {
        in: {
            get: function() {
                return this.__in;
            }
        },
        out: {
            get: function() {
                return this.__out;
            }
        }
    });

    var Proto = PotentialFriend.prototype;

    Proto.constructor = PotentialFriend;

    return PotentialFriend;
};