const { Router } = require('express');
const Menu = require('./model');
const router = new Router();
const currentWeekNumber = require('current-week-number');

//get menus by date
router.get('/location/:locationId/menus', (req, res) => {
	const { date } = req.query;
	console.log('getting menu');
	Menu.findAll({
		where: {
			locationId: req.params.locationId,
			date: date
		}
	})
		.then((menu) => {
			res.send(menu);
		})
		.catch(console.error);
});

router.post('/location/:locationId/menus', (req, res) => {
	console.log('Check what is in the create menu 2', req.body.dish)

	const dish= {
		type_name: req.body.dish.type_name,
		dish_name: req.body.dish.dish_name,
		date: req.body.dish.date,
		locationId: req.params.locationId
	}
	console.log('dish', dish)
	const week = currentWeekNumber(dish.date);
	Menu.create({ ...dish, week: week } )
		.then((menu) => res.status(201).send(menu))
		.catch(console.error);
});

//delete menu by id
router.delete('/menus/:id', (req, res, next) => {
	const { id } = req.params;
	Menu.findByPk(id)
		.then((menuItem) => {
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
		.catch((error) => next(error));
});

//get menu by week
router.get('/location/:locationId/menu/week/:date', async (req, res, next) => {
	const { date } = req.params;

	try {
		const currentWeek = currentWeekNumber(date);

		const weekMenu = await Menu.findAll({
			where: {
				week: currentWeek,
				locationId: req.params.locationId
			}
		});
		res.send(weekMenu);
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;
