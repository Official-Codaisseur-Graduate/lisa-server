const { Router } = require("express");
const Menu = require("./model");
const router = new Router();

//get menus by date for Google

router.post("/google-menus", (req, res) => {
  const date =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.date
      ? req.body.queryResult.parameters.date.startDateTime
      : "Seems like some problem. Speak again.";

  Menu.findAll({
    where: {
      date: new Date(date)
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
      menuResponse = error;
    });
});

//get menus by date

router.get("/menus", (req, res) => {
  const { date } = req.query;
  Menu.findAll({
    where: {
      date: date
    }
  }).then(menu => {
    res.json(menu);
  });
});

//create new menu
router.post("/menus", (req, res) => {
  const { dish } = req.body;
  Menu.create(dish).then(menu => res.status(201).json(menu));
});

//delete menu by id
router.delete("/menus/:id", (req, res, next) => {
  const { id } = req.params;
  console.log("REQ PARAMS", req.params);
  Menu.findByPk(id)
    .then(menuItem => {
      if (!menuItem) {
        return res.status(404).send({
          message: `Menu item does not exist`
        });
      }
      return menuItem.destroy().then(() =>
        res.send({
          message: `Menu item was deleted`
        })
      );
    })
    .catch(error => next(error));
});

module.exports = router;
