const Menu = require('../../menu-table/model')

async function hoofdgerechtSentence(date) {
  try {
    const menu = await Menu.findAll({
      where: {
        date,
      }
    });
    // console.log('--menu--', menu);

    const hoofdgerecht = menu.reduce(
      (acc, val) => {
        const { dish_name, type_name } = val.dataValues;

        if (type_name === 'Hoofdgerecht 1') {
          acc.hoofdgerecht1 = dish_name
          return acc
        }
        if (type_name === 'Saus 1') {
          acc.saus1 = `${dish_name},`
          return acc
        }
        if (type_name === 'Bijgerecht 1') {
          if (!acc.bijgerechten1.length) {
            acc.bijgerechten1 = dish_name
          } else { acc.bijgerechten1 += ` en ${dish_name}` }
          return acc
        }
        if (type_name === 'Hoofdgerecht 2') {
          acc.hoofdgerecht2 = dish_name
          return acc
        }
        if (type_name === 'Saus 2') {
          acc.saus2 = `${dish_name},`
          return acc
        }
        if (type_name === 'Bijgerecht 2') {
          if (!acc.bijgerechten2.length) {
            acc.bijgerechten2 = dish_name
          } else { acc.bijgerechten2 += ` en ${dish_name}` }
          return acc
        }
        return acc;
      },
      {
        hoofdgerecht1: '',
        saus1: '',
        bijgerechten1: '',
        hoofdgerecht2: '',
        saus2: '',
        bijgerechten2: '',
      }
    );
    const { hoofdgerecht1, hoofdgerecht2, saus1, saus2, bijgerechten1, bijgerechten2 } = hoofdgerecht
    const sentence = `De eerste keuze voor het hoofdgerecht is ${hoofdgerecht1} met ${saus1} ${bijgerechten1}. De tweede keuze is ${hoofdgerecht2} met ${saus2} ${bijgerechten2}.`;
    //console.log('innoType', sentence);
    return sentence;
  } catch (error) {
    res.send();
    return 'Er ging iets mis';
  }
}

module.exports = hoofdgerechtSentence;
