const Menu = require("../../menu-table/model");

async function hoofdgerechtSentence(locationId, date) {
  const menu = await Menu.findAll({
    where: {
      date,
      locationId
    }
  });

  if (
    !menu.some(item => item.dataValues.type_name === "Hoofdgerecht 1") &&
    !menu.some(item => item.dataValues.type_name === "Hoofdgerecht 2")
  ) {
    return "Geen hoofdgerecht voor deze datum.";
  } // this conditional statement sees whether there the Hoofdgerecht 1 & 2 rows are filled, if not, there is no Hoofdgerecht

  const hoofdgerecht = menu.reduce(
    (acc, val) => {
      const { dish_name, type_name } = val.dataValues;

      if (type_name === "Hoofdgerecht 1") {
        acc.hoofdgerecht1 = `${dish_name} `;
        return acc;
      }
      if (type_name === "Saus 1") {
        acc.saus1 = `met ${dish_name} `;
        return acc;
      }
      if (type_name === "Bijgerecht 1") {
        if (!acc.saus1.length) {
          acc.bijgerechten1 = `met ${dish_name}`;
        } else {
          acc.bijgerechten1 += `en ${dish_name}`;
        }
        return acc;
      }
      if (type_name === "Hoofdgerecht 2") {
        acc.hoofdgerecht2 = `${dish_name} `;
        return acc;
      }
      if (type_name === "Saus 2") {
        acc.saus2 = `met ${dish_name} `;
        return acc;
      }
      if (type_name === "Bijgerecht 2") {
        if (!acc.saus2.length) {
          acc.bijgerechten2 = `met ${dish_name}`;
        } else {
          acc.bijgerechten2 += `en ${dish_name}`;
        }
        return acc;
      }
      return acc;
    },
    {
      hoofdgerecht1: "",
      saus1: "",
      bijgerechten1: "",
      hoofdgerecht2: "",
      saus2: "",
      bijgerechten2: ""
    }
  );

  const {
    hoofdgerecht1,
    hoofdgerecht2,
    saus1,
    saus2,
    bijgerechten1,
    bijgerechten2
  } = hoofdgerecht;

  const hoofdgerechtResponse = hoofdgerecht.hoofdgerecht2
    ? "<speak><s>Het hoofdgerecht is " +
      `${hoofdgerecht1} ${saus1} ${bijgerechten1}</s>` +
      `<s>of ${hoofdgerecht2}${saus2}${bijgerechten2}.</s>` +
      "</speak>"
    : "<speak><s>Het hoofdgerecht is " +
      `${hoofdgerecht1} ${saus1} ${bijgerechten1}.</s>` +
      "</speak>";
  // this checks whether the second main dish is present, if not, google assistant only responds with the first

  return hoofdgerechtResponse;
}

module.exports = hoofdgerechtSentence;
