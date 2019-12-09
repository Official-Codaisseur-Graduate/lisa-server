const Location = require('./location-table/model')
/* Keep this table in sync with
 * https://www.vitalisgroep.nl/vitalis-woonzorg-groep/vitalis/onze-locaties
 */

const createLocations = async () => {

  await Location.findOrCreate({
    where: {
      name: 'Vitalis Brunswijck',
      address: 'Generaal Bradleylaan 1, 5623 KM Eindhoven',
      latitude: 51.4664151,
      longitude: 5.4715849
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: 'Vitalis Peppelrode',
      address: 'Ds. Th. Fliednerstraat 5, 5631 BM Eindhoven',
      latitude: 51.4568719,
      longitude: 5.4869736
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: 'Vitalis Wissehaege',
      address: 'Herman Gorterlaan 4, 5644 SX Eindhoven',
      latitude: 51.4176609,
      longitude: 5.4777061
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: 'Vitalis Vonderhof',
      address: 'Bernhardplaats 1, 5616 TG Eindhoven',
      latitude: 51.4383254,
      longitude: 5.4662833
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: 'Vitalis Vaandelhof',
      address: 'De Grijze Generaal Winston Churchilllaan 75, 5623 KW Eindhoven',
      latitude: 51.4669934,
      longitude: 5.4742395
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: 'Vitalis Wonen aan de Fakkellaan',
      address: 'Fakkellaan 19/25, 5624 EA Eindhoven',
      latitude: 51.4716014,
      longitude: 5.452226
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "WoonincPlusVitalis 't Lint",
      address: 'Herman Gorterlaan 400-566, 5644 ST Eindhoven',
      latitude: 51.4174611,
      longitude: 5.4802071
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "WoonincPlusVitalis Kortonjo",
      address: 'Herman Gorterlaan 1, 5644 SB Eindhoven',
      latitude: 51.4173903,
      longitude: 5.4811905
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "WoonincPlusVitalis Parc Gender / Engelsbergen",
      address: 'Maria van Bourgondiëlaan 8, 5616 EE Eindhoven',
      latitude: 51.4314284,
      longitude: 5.45661
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "WoonincPlusVitalis Maximiliaan",
      address: 'Maria van Bourgondiëlaan 8, 5616 EE Eindhoven',
      latitude: 51.4314284,
      longitude: 5.45661
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "WoonincPlusVitalis De Hagen",
      address: 'Maria van Bourgondiëlaan 8, 5616 EE Eindhoven',
      latitude: 51.4314284,
      longitude: 5.45661
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "WoonincPlusVitalis Berckelhof",
      address: 'Generaal Cronjéstraat 3, 5642 MH Eindhoven',
      latitude: 51.4388131,
      longitude: 5.515786
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "WoonincPlusVitalis De Horst",
      address: 'Imkerstraat 6, 5623 DC Eindhoven',
      latitude: 51.4548344,
      longitude: 5.4707465
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "WoonincPlusVitalis Kronehoef",
      address: 'Kloosterdreef 23, 5623 DA Eindhoven',
      latitude: 51.4545392,
      longitude: 5.4688324,
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "WoonincPlusVitalis De Dreef",
      address: 'Kloosterdreef 23, 5623 DA Eindhoven',
      latitude: 51.4545392,
      longitude: 5.4688324,
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "WoonincPlusVitalis Theresia",
      address: 'Bredalaan 77, 5652 JB Eindhoven',
      latitude: 51.439106,
      longitude: 5.4374791,
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "WoonincPlusVitalis Wilgenhof",
      address: 'Gasthuisstraat 1, 5614 AR Eindhoven',
      latitude: 51.430246,
      longitude: 5.4872367,
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "Residentie Petruspark",
      address: 'Mgr. Swinkelsstraat 2, 5623 AP Eindhoven',
      latitude: 51.4556347,
      longitude: 5.4703739,
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "Residentie De Hoeve",
      address: 'Imkerstraat 2, 5623 DC Eindhoven',
      latitude: 51.4551412,
      longitude: 5.4691789,
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "Residentie Genderstate",
      address: 'Maria van Bourgondiëlaan 8',
      latitude: 51.4314284,
      longitude: 5.45661
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "Residentie Gennep",
      address: 'Herman Gorterlaan 310-392, 5644 SR Eindhoven',
      latitude: 51.417452,
      longitude: 5.4803221,
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "Residentie Wilgenhof",
      address: 'Schalmstraat 2, 5614 AR Eindhoven',
      latitude: 51.4298216,
      longitude: 5.4882562,
    }, defaults: {}
  })
  await Location.findOrCreate({
    where: {
      name: "Vitalis Parc Imstenrade (Heerlen)",
      address: 'Parc Imstenrade 66 ,6418 PP Heerlen',
      latitude: 50.8648117,
      longitude: 5.9890563,
    }, defaults: {}
  })
}

module.exports = createLocations

