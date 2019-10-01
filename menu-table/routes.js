const { Router } = require("express");
const Menu = require("./model");
const router = new Router();

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
