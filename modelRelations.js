const Dishtype = require("./type-table/model");
const Dish = require("./dish-table/model");
const Location = require("./location-table/model");
const Menu = require("./menu-table/model");

//relations as we got them from class 31
Menu.belongsTo(Location);
Dish.belongsTo(Location);

Location.hasOne(Menu);
Location.hasOne(Dish);

Dish.belongsTo(Dishtype);
Dishtype.hasMany(Dish);

/* realtions as they probably would make more sense:

Location.hasMany(Menu); - for different dates
Menu.belongsTo(Location); - 

Menu.hasMany(Dish);
Dish.belongsTo(Menu);

Dishtype.hasMany(Dish);
Dish.belongsTo(Dishtype);
*/
