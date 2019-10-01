const { Router } = require('express')

const Menu = require('../menu-table/model')

const router = new Router();

//get menus by date for Google

router.post("/google-menus", (req, res) => {
  let date

  if (req.body.queryResult.parameters.date.startDateTime) {
    date = new Date(req.body.queryResult.parameters.date.startDateTime)
  } else if (req.body.queryResult.parameters.date) {
    date = new Date(req.body.queryResult.parameters.date)
  } else {
    date = new Date()
  }

  Menu.findAll({
    where: {
      date
    }
  })
    .then(menu => {
      const menuItemName = menu[0].dataValues.dish_name;

      const speechResponse = {
        google: {
          expectUserResponse: true,
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech: menuItemName
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
})

module.exports = router
