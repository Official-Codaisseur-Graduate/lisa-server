const { Router } = require('express');

const router = new Router();

router.post('/echo', function(req, res) {
	const speech =
		req.body.queryResult &&
		req.body.queryResult.parameters &&
		req.body.queryResult.parameters.echoText
			? req.body.queryResult.parameters.echoText
			: 'Seems like some problem. Speak again.';

	console.log('test', req.body);
	const speechResponse = {
		google: {
			expectUserResponse: true,
			richResponse: {
				items: [
					{
						simpleResponse: {
							textToSpeech: speech
						}
					}
				]
			}
		}
	};

	return res.json({
		payload: speechResponse,
		//data: speechResponse,
		fulfillmentText: speech,
		speech: speech,
		displayText: speech,
		source: 'webhook-echo-sample'
	});
});

module.exports = router;
