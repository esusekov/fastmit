"use strict";

module.exports = /*@ngInject*/ function(friendsService, websocketInteraction) {

    return {

        init() {
            console.log('App init');

            return friendsService.init().then(() => {

                websocketInteraction.on(event => {
                    var type = event.type;
                    var data = event.body;

                    console.log('On message', event);
                    
                        
                    switch(type) {

                        case 'message':
                            friendsService.setMessage(data);
                            break;

                    }
                });

            });
        },

        get friendsService() {
            return friendsService;
        }

    };
};

