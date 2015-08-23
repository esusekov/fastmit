"use strict";

module.exports = /*@ngInject*/ function() {

    return {
        TEXT: {
            'type': 'object',
            'properties': {
                'type': {'type': 'string', 'enum': ['text']},
                'messageId': {'type': 'string'},
                'time': {'type': 'number'},
                'encodedText': {'type': 'string'}
            },
            'required': ['type', 'messageId', 'time', 'encodedText']
        },

        PHOTO: {
            'type': 'object',
            'properties': {
                'type': {'type': 'string', 'enum': ['photo']},
                'messageId': {'type': 'string'},
                'time': {'type': 'number'},
                'photoUrl': {'type': 'string'},
                'encodedPassPhrase': {'type': 'string'},
                'timeout': {'type': 'number'}
            },
            'required': ['type', 'messageId', 'time', 'photoUrl', 'encodedPassPhrase', 'timeout']
        },

        MESSAGE: {
            'type': 'object',
            'properties': {
                'type': {'type': 'string', 'enum': ['message']},
                'body': {
                    'type': 'object',
                    'properties': {
                        'friendId': {'type': 'string'},
                        'message': {'type': 'object'}
                    },
                    required: ['friendId', 'message']
                }
            },
            required: ['type', 'body']
        },

        MESSAGES: {
            'type': 'object',
            'properties': {
                'type': {'type': 'string', 'enum': ['messages']},
                'body': {
                    'type': 'array',
                    'items': {
                        'type': 'object',
                        'properties': {
                            'friendId': {'type': 'string'},
                            'messages': {'type': 'array', 'items': {'type': 'object'}}
                        },
                        required: ['friendId', 'messages']
                    }

                }
            },
            required: ['type', 'body']
        }
    };
};