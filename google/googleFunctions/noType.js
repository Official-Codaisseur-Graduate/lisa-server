const Menu = require('../../menu-table/model');

async function noTypeSentence(date) {
  const menu = await Menu.findAll({
    where: {
      date: date
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
      } else if (
        type_name.split(' ')[0] === 'Hoofdgerecht'
      ) {
        if (acc.hoofdgerecht.length < 1) {
          acc.hoofdgerecht = `Het hoofdgerecht ${dish_name}`;
        } else {
          acc.hoofdgerecht += ` of ${dish_name}`;
        }
      } else if (type_name.split(' ')[0] === 'Nagerecht') {
        if (acc.nagerecht.length < 1) {
          acc.nagerecht = `Het nagerecht ${dish_name}`;
        } else {
          acc.nagerecht += ` of ${dish_name}`;
        }
      }
      return acc;
    },
    {
      voorgerecht: '',
      hoofdgerecht: '',
      nagerecht: ''
    }
  );
  const sentence = `<speak><p><s>${menuSentence.voorgerecht}.</s> <s>${menuSentence.hoofdgerecht}.</s> ${menuSentence.nagerecht}.</p> </speak>`;
  // console.log('in noType', sentence);
  return sentence;
}

module.exports = noTypeSentence;
