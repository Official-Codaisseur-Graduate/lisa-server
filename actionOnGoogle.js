const express = require('express');
const bodyParser = require('body-parser');
const Menu = require('./menu-table/model');
const {
	dialogflow,
	actionssdk,
	Image
} = require('actions-on-google');
const googleApp = actionssdk();

// Intent in Dialogflow called `Goodbye`
googleApp.intent('actions.intent.TEXT', (conv, input) => {
	if (input === 'can you repeat again') {
		return conv.ask('today menu or tomorrow menu');
	} else if (
		input === 'cancel' ||
		input === 'exit' ||
		input === 'thank you'
	) {
		return conv.close('See you later!');
	}

	conv.ask(`I didn't understand. Can you tell me something else?`);
});

const expressApp = express().use(bodyParser.json());
expressApp.post('/fulfillment', googleApp);

expressApp.listen(5000);
