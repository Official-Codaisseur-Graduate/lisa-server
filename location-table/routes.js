const { Router } = require('express')
const Location = require('./model')
const router = new Router()

//update a dish location
router.put('/locations/:id', (req, res, next) => {
  Location
    .findByPk(req.params.id)
    .then(location => {
      if (!location) {
        return res.status(404).send({
          message: `Location does not exist`
        })
      }
      return location.update(req.body).then(location => res.send(location))
    })
    .catch(error => next(error))
})

//delele a dish location
router.delete('/locations/:id', (req, res, next) => {
  Location
    .findByPk(req.params.id)
    .then(location => {
      if (!location) {
        return res.status(404).send({
          message: `Location does not exist`
        })
      }
      return location.destroy()
        .then(() => res.send({
          message: `Location was deleted`
        }))
    })
    .catch(error => next(error))
})

// create new location
router.post('/locations', function (req, res, next) {
    const location = {
    name: req.body.location.name,
  };
  Location.create(location)
    .then(location => {
      if (!location) {
        return res.status(404).send({
          message: `Something went wrong`
        });
      }
      return res.send(location)
    })
    .catch(err => next(err));
})

//get all locations
router.get("/locations", function (req, res, next) {
  Location.findAll()
    .then(locations => {
      res.json(locations);
    })
    .catch(err => next(err));
});

//gets a location by id
router.get("/locations/:id", function (req, res, next) {
  const id = req.params.id;
  Location.findByPk(id)
    .then(location => {
      if (!location) {
        return res.status(404).send({
          message: `Location does not exit`
        });
      }
      return res.send(location)
    })
    .catch(err => next(err))
})

module.exports = router