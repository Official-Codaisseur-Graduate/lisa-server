const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Menu = require("../../menu-table/model");

async function nagerechtSentence(locationId, date) {
  const menu = await Menu.findAll({
    where: {
      date,
      locationId
    }
  });

  if (
    !menu.some(item => item.dataValues.type_name === "Nagerecht 1") &&
    !menu.some(item => item.dataValues.type_name === "Nagerecht 2")
  ) {
    return "Geen nagerecht voor deze datum.";
  } // this conditional statement sees whether there the Nagerecht 1 & 2 rows are filled, if not, there is no Nagerecht

  const menuSentence = menu.reduce(
    (acc, val) => {
      const { dish_name, type_name } = val.dataValues;

      if (type_name.split(" ")[0] === "Nagerecht") {
        if (acc.nagerecht.length < 1) {
          acc.nagerecht = `Het nagerecht is ${dish_name}`;
        } else {
          acc.nagerecht += ` of ${dish_name}`;
        }
      }
      return acc;
    },
    {
      nagerecht: ""
    }
  );
  return `<speak><s>${menuSentence.nagerecht}.</s></speak>`;
}

module.exports = nagerechtSentence;
