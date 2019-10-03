const { Router } = require('express');

const Menu = require('../menu-table/model');
const noTypeSentence = require('./googleFunctions/noType');
const typeSentence = require('./googleFunctions/voorOfNagerecht');
const hoofdgerechtSentence = require('./googleFunctions/hoofdgerechtSentence')
const sendError = require('./googleResponses/error')

const router = new Router();

//get menus by date for Google
router.post('/google-menus', async (req, res) => {
  try {
    const body = req.body.queryResult.parameters;

    let date;
    if (body.date && body.date.startDateTime) {
      date = new Date(body.date.startDateTime);
    } else if (body.date) {
      date = new Date(body.date);
    } else {
      date = new Date();
    }

    const menuExists = await Menu.findOne({
      where: { date }
    })
    if (!menuExists) {
      const noMenu = `Het menu voor die dag is onbekend. Probeer een andere dag.`
      return res.send(sendError(noMenu))
    }

    let finalMenu;
    if (body.type.length === 0 || !body.type) {
      finalMenu = await noTypeSentence(date);
    } else if (
      body.type === 'Voorgerecht' ||
      body.type === 'Nagerecht'
    ) {
      finalMenu = await typeSentence(date, body.type);
    } else if (
      body.type === 'Hoofdgerecht'
    ) {
      finalMenu = await hoofdgerechtSentence(date)
    }

    const textToSpeech = `<speak><prosody rate="slow">${finalMenu}</prosody></speak>`

    const speechResponse = {
      google: {
        expectUserResponse: false,
        richResponse: {
          items: [
            {
              simpleResponse: {
                textToSpeech
              }
            }
          ]
        }
      }
    };

    return res.json({
      payload: speechResponse,
      fulfillmentText: finalMenu,
      speech: finalMenu,
      displayText: finalMenu,
      source: 'webhook-echo-sample'
    });
  } catch (error) {
    return res.send('Er ging iets mis');
  }
});

module.exports = router;