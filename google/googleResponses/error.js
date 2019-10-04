const sendError = (error = "Er is iets misgegaan. Probeer het opnieuw.") => {
  return {
    payload: {
      google: {
        expectUserResponse: true,
        richResponse: {
          items: [
            {
              simpleResponse: {
                textToSpeech: `<speak><prosody rate="slow">${error}</prosody></speak>`
              }
            }
          ]
        }
      }
    },
    fulfillmentText: error,
    speech: error,
    displayText: error,
    source: 'webhook-echo-sample'
  }
}

module.exports = sendError