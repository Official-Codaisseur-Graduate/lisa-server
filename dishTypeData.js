const Type = require('./type-table/model')

const createDishTypes = () => {
  Type.findOrCreate({ where: { name: 'Voorgerecht 1' }, defaults: {} })
  Type.findOrCreate({ where: { name: 'Voorgerecht 2' }, defaults: {} })
  Type.findOrCreate({ where: { name: 'Hoofdgerecht 1' }, defaults: {} })
  Type.findOrCreate({ where: { name: 'Hoofdgerecht 2' }, defaults: {} })
  Type.findOrCreate({ where: { name: 'Saus 1' }, defaults: {} })
  Type.findOrCreate({ where: { name: 'Saus 2' }, defaults: {} })
  Type.findOrCreate({ where: { name: 'Bijgerecht 1' }, defaults: {} })
  Type.findOrCreate({ where: { name: 'Bijgerecht 2' }, defaults: {} })
  Type.findOrCreate({ where: { name: 'Nagerecht 1' }, defaults: {} })
  Type.findOrCreate({ where: { name: 'Nagerecht 2' }, defaults: {} })

}

module.exports = createDishTypes