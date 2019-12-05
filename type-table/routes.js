const { Router } = require('express')
const Dishtype = require('./model')
const router = new Router()

//get all types
router.get("/types", function (req, res, next) {
  Dishtype.findAll()
    .then(types => {
      res.json(types);
    })
    .catch(err => next(err));
});

//gets a type by id
router.get("/types/:id", function (req, res, next) {
  const id = req.params.id;
  Dishtype.findByPk(id)
    .then(type => {
      if (!type) {
        return res.status(404).send({
          message: `Type does not exit`
        });
      }
      return res.send(type)
    })
    .catch(err => next(err))
})

//update a dish type NOT USED
router.put('/types/:id', (req, res, next) => {
  Dishtype
    .findByPk(req.params.id)
    .then(type => {
      if (!type) {
        return res.status(404).send({
          message: `Type does not exist`
        })
      }
      return type.update(req.body).then(type => res.send(type))
    })
    .catch(error => next(error))
})

//delele a dish type NOT USED
router.delete('/types/:id', (req, res, next) => {
  Dishtype
    .findByPk(req.params.id)
    .then(type => {
      if (!type) {
        return res.status(404).send({
          message: `Type does not exist`
        })
      }
      return type.destroy()
        .then(() => res.send({
          message: `Type was deleted`
        }))
    })
    .catch(error => next(error))
})

// create new type NOT USED 
router.post('/location/:locationId/types', function (req, res, next) {
  console.log('REQ', req.body)
  const type = {
    name: req.body.type.name,
  };
  Dishtype.create(type)
    .then(type => {
      if (!type) {
        return res.status(404).send({
          message: `Something went wrong`
        });
      }
      return res.send(type)
    })
    .catch(err => next(err));
})

module.exports = router