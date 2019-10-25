const { Router } = require('express');
const { findNearest } = require('geolib');
const { dialogflow, Permission } = require('actions-on-google');

const Menu = require('../menu-table/model');
const Location = require('../location-table/model')

const noTypeSentence = require('./googleFunctions/noType');
const typeSentence = require('./googleFunctions/voorOfNagerecht');
const hoofdgerechtSentence = require('./googleFunctions/hoofdgerechtSentence')

const router = new Router();
const app = dialogflow(
  // { debug: true }
);

app.intent('fetch_menu', async (conv) => {
  conv.user.storage.parameters = conv.body.queryResult.parameters;
  conv.data.requestedPermission = 'DEVICE_PRECISE_LOCATION'
  if (conv.user.storage.location) {
    await readMenu(conv)
  } else {
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
      conv.user.storage.location =
        await getLocation(conv.device.location.coordinates)
      await readMenu(conv)
    }
  } else {
    return conv.close('Zonder locatie kan ik niet weten aan' +
      ' welke keuken ik de vraag moet stellen');
  }
});

app.intent('delete_location', (conv) => {
  delete conv.user.storage.location
  conv.close('Oké, ik zal de volgende keer ' +
    'de locatie opnieuw opvragen')
})

app.fallback((conv) => {
  conv.ask('Ik heb geen antwoord op deze vraag')
})

app.catch((conv, error) => {
  console.error(error)
  conv.close('Er ging iets mis. ' +
    'Waarschijnlijk is er geen verbinding met de server')
})

//get menus by date for Google
router.post('/google-menus', app)

readMenu = async (conv) => {
  const { id, name } = conv.user.storage.location
  const body = conv.user.storage.parameters;
  const date = body.date && body.date.startDateTime ?
    new Date(body.date.startDateTime) : body.date ?
      new Date(body.date) : new Date()
  const menuExists = await Menu.findOne({
    where: { date, locationId: id }
  })

  if (!menuExists) {
    return conv.ask(`Het menu voor die dag bij ${name} ` +
      'is onbekend. Probeer een andere dag')
  }

  switch (body.type) {
    case 'Voorgerecht':
    case 'Nagerecht':
      conv.ask(await typeSentence(id, date, body.type));
      break;
    case 'Hoofdgerecht':
      conv.ask(await hoofdgerechtSentence(id, date));
      break;
    default:
      conv.ask(await noTypeSentence(id, date));
      break;
  }
}

getLocation = async (coordinates) => {
  const locations = await Location.findAll()
  const vitalisLocations = [...locations.map(vitalisLocation =>
    vitalisLocation = {
      latitude: vitalisLocation.latitude,
      longitude: vitalisLocation.longitude
    }
  )]
  const { latitude, longitude } =
    findNearest(coordinates, vitalisLocations)
  return locations.find(loc =>
    loc.latitude === latitude && loc.longitude === longitude
  )
}

module.exports = router;