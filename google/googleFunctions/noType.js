const Menu = require("../../menu-table/model");

async function noTypeSentence(locationId, date) {
  const menu = await Menu.findAll({
    where: {
      date,
      locationId
    }
  });
  const menuSentence = menu.reduce(
    (acc, val) => {
      const { dish_name, type_name } = val.dataValues;

      if (type_name.split(" ")[0] === "Voorgerecht") {
        if (acc.voorgerecht.length < 1) {
          acc.voorgerecht = `Het voorgerecht is ${dish_name}.`;
        } else {
          acc.voorgerecht = acc.voorgerecht.substring(
            0,
            acc.voorgerecht.length - 1
          );
          acc.voorgerecht += ` <break time="150ms" />of ${dish_name}. `;
        }
      } else if (type_name.split(" ")[0] === "Hoofdgerecht") {
        if (acc.hoofdgerecht.length < 1) {
          acc.hoofdgerecht = `Het hoofdgerecht is ${dish_name}.`;
        } else {
          acc.hoofdgerecht = acc.hoofdgerecht.substring(
            0,
            acc.hoofdgerecht.length - 1
          );
          acc.hoofdgerecht += ` <break time="150ms" />of ${dish_name}. `;
        }
      } else if (type_name.split(" ")[0] === "Nagerecht") {
        if (acc.nagerecht.length < 1) {
          acc.nagerecht = `Het nagerecht is ${dish_name}`;
        } else {
          acc.nagerecht += ` <break time="150ms" />of ${dish_name}`;
        }
      }
      return acc;
    },
    {
      voorgerecht: "",
      hoofdgerecht: "",
      nagerecht: ""
    }
  );
  return (
    "<speak>" +
    `<s>${menuSentence.voorgerecht}</s>` +
    `<s>${menuSentence.hoofdgerecht}</s>` +
    `<s>${menuSentence.nagerecht}</s>` +
    "</speak>"
  );
}

module.exports = noTypeSentence;
