const Menu = require("../../menu-table/model");
const hoofdgerechtSentence = require("./hoofdgerechtSentence");
const voorgerechtSentence = require("./voorgerechtSentence");
const nagerechtSentence = require("./nagerechtSentence");


//this function uses three functions for hoofd-, na- and voorgerecht sentences to present the whole menu for a day
//all three functons are in turn used in case when user asks for a specific dish type from the menu.
async function noTypeSentence(locationId, date) {
  const menu = await Menu.findAll({
    where: {
      date,
      locationId
    }
  });

  const voorgerecht = await voorgerechtSentence(locationId, date);
  const hoofdgerecht = await hoofdgerechtSentence(locationId, date);
  const nagerecht = await nagerechtSentence(locationId, date);

  return (
    "<speak>" +
    `<s>${voorgerecht}</s>` +
    `<s>${hoofdgerecht}</s>` +
    `<s>${nagerecht}</s>` +
    "</speak>"
  );
}

module.exports = noTypeSentence;
