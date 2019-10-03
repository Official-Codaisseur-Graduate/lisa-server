const { Router } = require('express');

const Menu = require('../menu-table/model');
const noTypeSentence = require('./googleFunctions/noType');
const typeSentence = require('./googleFunctions/voorOfNagerecht');
const hoofdgerechtSentence = require('./googleFunctions/hoofdgerechtSentence')
const sendError = require('./googleResponses/error')
const sendMenu = require('./googleResponses/menu')

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

    let menu;
    if (body.type.length === 0 || !body.type) {
      menu = await noTypeSentence(date);
    } else if (
      body.type === 'Voorgerecht' ||
      body.type === 'Nagerecht'
    ) {
      menu = await typeSentence(date, body.type);
    } else if (
      body.type === 'Hoofdgerecht'
    ) {
      menu = await hoofdgerechtSentence(date)
    }

    return res.send(sendMenu(menu))

  } catch (error) {
    return res.send(sendError());
  }
});

module.exports = router;