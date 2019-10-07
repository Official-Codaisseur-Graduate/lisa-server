const { Router } = require('express');
const Menu = require('./model');
const router = new Router();
const currentWeekNumber = require('current-week-number');

//get menus by date
router.get('/menus', (req, res) => {
	const { date } = req.query;
	console.log('getting menu');
	Menu.findAll({
		where: {
			date: date
		}
	}).then((menu) => {
		res.json(menu);
	});
});

//create new menu
router.post('/menus', (req, res) => {
	const { dish } = req.body;
	const week = currentWeekNumber(dish.date);
	Menu.create({ ...dish, week: week })
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
router.get('/menu/week/:date', async (req, res, next) => {
	const { date } = req.params;

	try {
		const currentWeek = currentWeekNumber(date);

		const weekMenu = await Menu.findAll({
			where: {
				week: currentWeek
			}
		});
		res.send(weekMenu);
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;
