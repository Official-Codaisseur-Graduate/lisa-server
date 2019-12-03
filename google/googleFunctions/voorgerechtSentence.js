const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Menu = require("../../menu-table/model");

async function voorgerechtSentence(locationId, date) {
  const menu = await Menu.findAll({
    where: {
      date,
      locationId
    }
  });

  if (
    !menu.some(item => item.dataValues.type_name === "Voorgerecht 1") &&
    !menu.some(item => item.dataValues.type_name === "Voorgerecht 2")
  ) {
    return "Geen voorgerecht voor deze datum.";
  } // this conditional statement sees whether there the Voorgerecht 1 & 2 rows are filled, if not, there is no Voorgerecht

  const menuSentence = menu.reduce(
    (acc, val) => {
      const { dish_name, type_name } = val.dataValues;

      if (type_name.split(" ")[0] === "Voorgerecht") {
        if (acc.voorgerecht.length < 1) {
          acc.voorgerecht = `Het voorgerecht is ${dish_name}`;
        } else {
          acc.voorgerecht += ` of ${dish_name}`;
        }
      }
      return acc;
    },
    {
      voorgerecht: ""
    }
  );
  return `<speak><s>${menuSentence.voorgerecht}</s></speak>`;
}

module.exports = voorgerechtSentence;
