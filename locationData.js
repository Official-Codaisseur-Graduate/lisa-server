const Location = require('./location-table/model')

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

}

module.exports = createLocations

