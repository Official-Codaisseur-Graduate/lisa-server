const sendMenu = (menu) => {
  return {
    payload: {
      google: {
        expectUserResponse: false,
        richResponse: {
          items: [
            {
              simpleResponse: {
                textToSpeech: `<speak><prosody rate="slow">${menu}</prosody></speak>`
              }
            }
          ]
        }
      }
    },
    fulfillmentText: menu,
    speech: menu,
    displayText: menu,
    source: 'webhook-echo-sample'
  }
}

module.exports = sendMenu