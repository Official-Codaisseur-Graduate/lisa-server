const { Router } = require("express");
const Menu = require("./model");
const router = new Router();

//get menus by date

router.post("/menus", (req, res) => {
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
      console.log("menu", menu.dishName, menu)
      const speechResponse = {
        google: {
          expectUserResponse: true,
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech: menu.dishName
                }
              }
            ]
          }
        }
      };

      console.log("speech", speechResponse)

      return res.json({
        payload: speechResponse,
        fulfillmentText: menu.dishName,
        speech: menu.dishName,
        displayText: menu.dishName,
        source: "webhook-echo-sample"
      });
    })
    .catch(error => {
      menuResponse = error;
    });
});

// router.post("/menus", (req, res) => {
//   if (
//     req.body.queryResult &&
//     req.body.queryResult.parameters &&
//     req.body.queryResult.parameters.date
//   ) {
//     const date = req.body.queryResult.parameters.date;

//     Menu.findAll({
//       where: {
//         date: new Date(date)
//       }
//     }).then(menu => {
//       res.json(menu);
//     });
//   } else {
//     return res.status(400).send({
//       message: "Please provide a date parameter",
//       succes: false
//     });
//   }
// });

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
