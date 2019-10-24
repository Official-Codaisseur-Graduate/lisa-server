const { Router } = require('express');

const { findNearest } = require('geolib');
const Menu = require('../menu-table/model');
const Location = require('../location-table/model')
const noTypeSentence = require('./googleFunctions/noType');
const typeSentence = require('./googleFunctions/voorOfNagerecht');
const hoofdgerechtSentence = require('./googleFunctions/hoofdgerechtSentence')

const router = new Router();

const {
  dialogflow,
  Permission
} = require('actions-on-google');

const app = dialogflow({
  debug: true
});

app.intent('fetch_menu', async (conv) => {
  conv.user.storage.parameters = conv.body.queryResult.parameters;
  conv.data.requestedPermission = 'DEVICE_PRECISE_LOCATION'
  if (conv.user.storage.location) {
    await readMenu(conv)
  } else {
    conv.user.storage.parameters = conv.body.queryResult.parameters;
    return conv.ask(new Permission({
      context: 'om de juiste keuken van Vitalis te raadplegen',
      permissions: conv.data.requestedPermission
    }));
  }
});

app.intent('user_info', async (conv, params, permissionGranted) => {
  if (permissionGranted) {
    const { requestedPermission } = conv.data;
    if (requestedPermission === 'DEVICE_PRECISE_LOCATION') {
      conv.user.storage.location = conv.device.location.coordinates
      await readMenu(conv)
    }
  } else {
    return conv.close('Zonder locatie kan ik niet weten aan welke keuken ik de vraag moet stellen');
  }
});

app.intent('delete_location', (conv) => {
  delete conv.user.storage.location
  conv.close('Oké, ik zal de volgende keer opnieuw de locatie opvragen')
})

app.intent('close_conversation', (conv) => {
  conv.close('Tot ziens')
})

app.fallback((conv) => {
  conv.ask('Ik kan dit niet beantwoorden. Wat is uw vraag?')
})

app.catch((conv, error) => {
  console.error(error)
  conv.close('Er ging iets mis. Ik heb de ontwikkelaar huisarrest gegeven')
})

//get menus by date for Google
router.post('/google-menus', app)

readMenu = async (conv) => {
  const { id, name } = await getLocation(conv)

  const body = conv.user.storage.parameters;

  let date;
  if (body.date && body.date.startDateTime) {
    date = new Date(body.date.startDateTime);
  } else if (body.date) {
    date = new Date(body.date);
  } else {
    date = new Date();
  }

  const menuExists = await Menu.findOne({
    where: {
      date,
      locationId: id
    }
  })

  if (!menuExists) {
    const noMenu = `Het menu voor die dag bij ${name} is onbekend. Probeer een andere dag.`
    return conv.ask(`${noMenu}`)
  }

  let menu;
  if (body.type.length === 0 || !body.type) {
    menu = await noTypeSentence(id, date);
  } else if (
    body.type === 'Voorgerecht' ||
    body.type === 'Nagerecht'
  ) {
    menu = await typeSentence(id, date, body.type);
  } else if (
    body.type === 'Hoofdgerecht'
  ) {
    menu = await hoofdgerechtSentence(id, date)
  }
  return conv.ask(menu)
}

getLocation = async (conv) => {
  const locations = await Location.findAll()
  const vitalisLocations = [...locations.map(vitalisLocation =>
    vitalisLocation = {
      latitude: vitalisLocation.latitude,
      longitude: vitalisLocation.longitude
    }
  )]
  const { latitude, longitude } =
    findNearest(conv.user.storage.location, vitalisLocations)
  return locations.find(loc =>
    loc.latitude === latitude && loc.longitude === longitude
  )
}

module.exports = router;