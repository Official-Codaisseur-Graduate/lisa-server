const { Router } = require('express')

const Menu = require('../menu-table/model')

const router = new Router();

//get menus by date for Google

router.post("/google-menus", (req, res) => {
  const body = req.body.queryResult.parameters
  let date
  if (body.date.startDateTime) {
    date = new Date(body.date.startDateTime)
  } else if (body.date) {
    date = new Date(body.date)
  } else {
    date = new Date()
  }

  if (body.type.length === 0 || !body.type) {
  
  console.log('\n vlaflip:' ,body.type) 

  Menu.findAll({
    where: {
      date: date
    }
  })
  
    .then(menu => {
      console.log('menu', menu)    
      //const menuItemName = menu.map(menu => menu.dataValues.dishName)
      const menuSentence = () => {return menu.reduce((acc, val, index, array) => {
        console.log('test', acc)
        const { dish_name, type_name } = val.dataValues
        //console.log('name', dish_name, type_name)
      
        if (index !== array.length -1 && dish_name === array[index +1].dataValues.dish_name) {
          
          if (type_name === 'Voorgerecht 1') {
            return `${acc.voorgerecht} Het voorgerecht is ${dish_name}, `
          } else if (type_name === 'Hoofdgerecht 1') {
            return ` ${acc.hoofdgerecht} Het hoofdgerecht is ${dish_name}, `
          } else if (type_name === 'Nagerecht 1') {
            return ` ${acc.nagerecht} Het nagerecht is ${dish_name}.`
          }
        }
        else if (type_name === 'Voorgerecht 1') {
          return `${acc.voorgerecht} Het voorgerecht is ${dish_name}`
        } 
        else if (type_name === 'Voorgerecht 2') {
          return `${acc.voorgerecht} of ${dish_name}, `
        } 
        else if (type_name === 'Hoofdgerecht 1') {
          return `${acc.hoofdgerecht} het hoofdgerecht ${dish_name}, `
        } 
        else if (type_name === 'Hoofdgerecht 2') {
          return `${acc.hoofdgerecht} of ${dish_name}, `
        } 
        else if (type_name === 'Nagerecht 1') {
          console.log('dessert1', dish_name)
          return `${acc.nagerecht} het nagerecht ${dish_name}, `
        } 
        else if (type_name == 'Nagerecht 2') {
          console.log('dessert2', dish_name)
          return `${acc.nagerecht} of ${dish_name}.`
        } 
        return acc
        
      }, {voorgerecht: '', hoofdgerecht: '', nagerecht: ''} )
    }


      console.log(voorgerecht, hoofdgerecht, nagerecht)

      const speechResponse = {
        google: {
          expectUserResponse: false,
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech: `Het menu voor vanavond is ${menuItemName}`
                }
              }
            ]
          }
        }
      };

      console.log("speech", speechResponse);

      return res.json({
        payload: speechResponse,
        fulfillmentText: menuItemName,
        speech: menuItemName,
        displayText: menuItemName,
        source: "webhook-echo-sample"
      });
    })
    .catch(error => {
      res.status(400).send({
        error: "Er ging iets mis"
      })
    });
}})

module.exports = router
