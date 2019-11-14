const { Router } = require("express");
const Dish = require("./model");
const Type = require("../type-table/model");

const router = new Router();

// adds a menu dish
router.post("/location/:locationId/dishes", function(req, res, next) {
  const { dishName, typeId } = req.body.dish;

  const dish = {
    name: dishName,
    typeId,
    locationId: req.params.locationId
  };

  Dish.create(dish)
    .then(dish => {
      if (!dish) {
        return res.status(404).send({
          message: `Something went wrong`
        });
      } else {
        Type.findByPk(req.body.dish.typeId, { include: [Dish] }).then(type => {
          return res.status(201).send(type);
        });
      }
    })
    .catch(err => next(err));
});

//update dish
router.put("/dishes/:id", (req, res, next) => {
  Dish.findByPk(req.params.id)
    .then(dish => {
      if (!dish) {
        return res.status(404).send({
          message: `Dish does not exist`
        });
      }
      return dish.update(req.body).then(dish => res.send(dish));
    })
    .catch(error => next(error));
});

//delele dish
router.delete("/dishes/:id", (req, res, next) => {
  Dish.findByPk(req.params.id)
    .then(dish => {
      if (!dish) {
        return res.status(404).send({
          message: `Dish does not exist`
        });
      }
      return dish.destroy().then(() =>
        res.send({
          message: `Dish was deleted`
        })
      );
    })
    .catch(error => next(error));
});

// get a menu dish by id
router.get("/location/:locationId/dishes/:id", function(req, res, next) {
  const id = req.params.id;
  Dish.findByPk(id, {
    where: { locationId: req.params.locationId }
  })
    .then(dish => {
      if (!dish) {
        return res.status(404).send({
          message: `Event does not exit`
        });
      }
      return res.send(dish);
    })
    .catch(err => next(err));
});

// get a menu dish by type
router.get("/location/:locationId/dishes", function(req, res, next) {
  Dish.findAll({
    where: {
      //added location
      typeId: req.query.type,
      locationId: req.params.locationId
    }
  })
    .then(dishes => {
      console.log(dishes);
      res.json(dishes);
    })
    .catch(err => next(err));
});

module.exports = router;
