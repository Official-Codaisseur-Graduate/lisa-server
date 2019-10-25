const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Menu = require('../../menu-table/model');

async function typeSentence(locationId, date, type) {
  const menu = await Menu.findAll({
    where: {
      date,
      type_name: { [Op.iLike]: `${type}%` },
      locationId
    }
  });

  const menuSentence = menu.reduce(
    (acc, val) => {
      const { dish_name, type_name } = val.dataValues;

      if (type_name.split(' ')[0] === 'Voorgerecht') {
        if (acc.voorgerecht.length < 1) {
          acc.voorgerecht = `Het voorgerecht is ${dish_name}`;
        } else {
          acc.voorgerecht += ` of ${dish_name}`;
        }
      } else if (type_name.split(' ')[0] === 'Nagerecht') {
        if (acc.nagerecht.length < 1) {
          acc.nagerecht = `Het nagerecht is ${dish_name}`;
        } else {
          acc.nagerecht += ` of ${dish_name}`;
        }
      }
      return acc;
    },
    {
      voorgerecht: '',
      nagerecht: ''
    }
  );
  return `<speak><s>${menuSentence.voorgerecht}</s><s>${menuSentence.nagerecht}</s></speak>`;
}

module.exports = typeSentence;
