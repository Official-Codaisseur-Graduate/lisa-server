const Location = require('./location-table/model')

const createLocations = () => {
    Location.findOrCreate({ where: { location_name: 'Location 1' }, defaults: {} })
    Location.findOrCreate({ where: { location_name: 'Location 2' }, defaults: {} })
    Location.findOrCreate({ where: { location_name: 'Location 3' }, defaults: {} })
    Location.findOrCreate({ where: { location_name: 'Location 4' }, defaults: {} })


}

module.exports = createLocations