const { Router } = require('express');

const Menu = require('../menu-table/model');
const noTypeSentence = require('./googleFunctions/noType');
const typeSentence = require('./googleFunctions/voorOfNagerecht');
const hoofdgerechtSentence = require('./googleFunctions/hoofdgerechtSentence')

const router = new Router();

//get menus by date for Google

router.post('/google-menus', async (req, res) => {
  const body = req.body.queryResult.parameters;
  if (!body.type && !body.date) {
    return res.send('Er ging iets mis');
  }
  let date;
  if (body.date.startDateTime) {
    date = new Date(body.date.startDateTime);
  } else if (body.date) {
    date = new Date(body.date);
  } else {
    date = new Date();
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

  const speechResponse = {
    google: {
      expectUserResponse: false,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: finalMenu
            }
          }
        ]
      }
    }
  };

  console.log('speech', speechResponse);

  return res.json({
    payload: speechResponse,
    fulfillmentText: finalMenu,
    speech: finalMenu,
    displayText: finalMenu,
    source: 'webhook-echo-sample'
  });
});

module.exports = router;
