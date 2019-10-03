const Menu = require('../../menu-table/model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function typeSentence(date, type) {
  console.log('type', type);
  try {
    const menu = await Menu.findAll({
      where: {
        date,
        type_name: { [Op.iLike]: `${type}%` }
      }
    });
    console.log('--menu--', menu);
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
    const sentence = `${menuSentence.voorgerecht}${menuSentence.nagerecht}. `;
    console.log('in noType', sentence);
    return sentence;
  } catch (error) {
    res.send();
    return 'Er ging iets mis';
  }
}

module.exports = typeSentence;
