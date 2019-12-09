//use this file to bulk create dishes only
//right now dish belongs to location and dishtype - that determines promise chain in this file
const db = require("./db");
const Dish = require("./dish-table/model");

db.dbSync({ force: true })
  .then(() =>
    Promise.all([
      Dish.destroy({
        where: {}
      })
    ])
  )
  .then(() => {
    const voorgerecht1 = [
      { name: "kipsoep", typeId: 1, locationId: 6 },
      { name: "truffelsoep", typeId: 1, locationId: 6 },
      { name: "pompoensoep", typeId: 1, locationId: 6 },
      { name: "mosterdsoep", typeId: 1, locationId: 6 },
      { name: "venkelsoep", typeId: 1, locationId: 6 },
      { name: "gazpacho", typeId: 1, locationId: 6 },
      { name: "courgettesoep", typeId: 1, locationId: 6 }
    ];

    const vg1Promises = voorgerecht1.map(v1 => Dish.create(v1));
    return Promise.all(vg1Promises);
  })
  .then(() => {
    const voorgerecht2 = [
      { name: "tartaar van mango en avocado", typeId: 2, locationId: 6 },
      { name: "aspergesoep met zalm", typeId: 2, locationId: 6 },
      { name: "salade met geitenkaas", typeId: 2, locationId: 6 },
      { name: "salade met carpaccio", typeId: 2, locationId: 6 },
      { name: "pastirnaaksoep", typeId: 2, locationId: 6 },
      { name: "bruschetta's met biefstuk", typeId: 2, locationId: 6 },
      { name: "paddenstoelenbouillion", typeId: 2, locationId: 6 }
    ];

    const vg2Promises = voorgerecht2.map(v2 => Dish.create(v2));
    return Promise.all(vg2Promises);
  })
  .then(() => {
    const hoofdgerecht1 = [
      { name: "paddenstoelen rissotto", typeId: 3, locationId: 6 },
      { name: "goulash", typeId: 3, locationId: 6 },
      { name: "spaghetti", typeId: 3, locationId: 6 },
      { name: "bonenstoof met chorizo", typeId: 3, locationId: 6 },
      { name: "curry met spruitjes", typeId: 3, locationId: 6 },
      { name: "pompoenstamppot", typeId: 3, locationId: 6 },
      { name: "hollandse ovenschotel met bloemkool", typeId: 3, locationId: 6 }
    ];

    const h1Promises = hoofdgerecht1.map(h1 => Dish.create(h1));
    return Promise.all(h1Promises);
  })
  .then(() => {
    const hoofdgerecht2 = [
      { name: "plaattart met rode biet", typeId: 4, locationId: 6 },
      { name: "pasta met spek en peer", typeId: 4, locationId: 6 },
      { name: "vegetarische preitaart", typeId: 4, locationId: 6 },
      { name: "raratouille", typeId: 4, locationId: 6 },
      { name: "frittata", typeId: 4, locationId: 6 },
      { name: "wraps met kip", typeId: 4, locationId: 6 },
      { name: "gevulde paprikas met couscous", typeId: 4, locationId: 6 }
    ];

    const h2Promises = hoofdgerecht2.map(h2 => Dish.create(h2));
    return Promise.all(h2Promises);
  })
  .then(() => {
    const bijgerecht1 = [
      { name: "taco's", typeId: 7, locationId: 6 },
      { name: "asperge salade met geitenkaas", typeId: 7, locationId: 6 },
      { name: "salade met kersen en mozzarella", typeId: 7, locationId: 6 },
      { name: "bloemkoolroosjes met tahin", typeId: 7, locationId: 6 },
      { name: "zoete aardappel spies", typeId: 7, locationId: 6 },
      { name: "spaanse tortilla", typeId: 7, locationId: 6 },
      { name: "aardappelsalade", typeId: 7, locationId: 6 }
    ];

    const b1Promises = bijgerecht1.map(b1 => Dish.create(b1));
    return Promise.all(b1Promises);
  })
  .then(() => {
    const bijgerecht2 = [
      { name: "falafel", typeId: 8, locationId: 6 },
      { name: "vijgenjam", typeId: 8, locationId: 6 },
      { name: "krokante pompoen uit de oven", typeId: 8, locationId: 6 },
      { name: "couscous salade", typeId: 8, locationId: 6 },
      { name: "pastasalade met tijm", typeId: 8, locationId: 6 },
      { name: "watermelon salade met perzik", typeId: 8, locationId: 6 },
      { name: "macaroni salade", typeId: 8, locationId: 6 }
    ];

    const b2Promises = bijgerecht2.map(b2 => Dish.create(b2));
    return Promise.all(b2Promises);
  })
  .then(() => {
    const sauce1 = [
      { name: "tacosaus", typeId: 6, locationId: 6 },
      { name: "coctailsaus", typeId: 6, locationId: 6 },
      { name: "satésaus", typeId: 6, locationId: 6 },
      { name: "ketchup", typeId: 6, locationId: 6 },
      { name: "wittesaus", typeId: 6, locationId: 6 },
      { name: "zoutzure pittige saus", typeId: 6, locationId: 6 },
      { name: "guacamole", typeId: 6, locationId: 6 }
    ];

    const s1Promises = sauce1.map(s1 => Dish.create(s1));
    return Promise.all(s1Promises);
  })
  .then(() => {
    const sauce2 = [
      { name: "olijfolie", typeId: 5, locationId: 6 },
      { name: "balsamic saus", typeId: 5, locationId: 6 },
      { name: "mosterd", typeId: 5, locationId: 6 },
      { name: "tomatensaus", typeId: 5, locationId: 6 },
      { name: "mayonaise", typeId: 5, locationId: 6 },
      { name: "pesto", typeId: 5, locationId: 6 },
      { name: "romige saus", typeId: 5, locationId: 6 }
    ];

    const s2Promises = sauce2.map(s2 => Dish.create(s2));
    return Promise.all(s2Promises);
  })
  .then(() => {
    const nagerecht1 = [
      { name: "appel crumble", typeId: 9, locationId: 6 },
      { name: "crepes met appel", typeId: 9, locationId: 6 },
      { name: "chocolademousse", typeId: 9, locationId: 6 },
      { name: "poffertjes", typeId: 9, locationId: 6 },
      { name: "oliebollen", typeId: 9, locationId: 6 },
      { name: "crepe Suzette", typeId: 9, locationId: 6 },
      { name: "nutella ijs", typeId: 9, locationId: 6 }
    ];

    const n1Promises = nagerecht1.map(n1 => Dish.create(n1));
    return Promise.all(n1Promises);
  })
  .then(() => {
    const sauce2 = [
      { name: "frisse citroenmousse", typeId: 10, locationId: 6 },
      { name: "ananas crumble", typeId: 10, locationId: 6 },
      { name: "kokos cheesecakejes", typeId: 10, locationId: 6 },
      { name: "tiramisu wafels", typeId: 10, locationId: 6 },
      { name: "stroopwafels", typeId: 10, locationId: 6 },
      { name: "stoofperen cake", typeId: 10, locationId: 6 },
      { name: "brownie wafels", typeId: 10, locationId: 6 }
    ];

    const s2Promises = sauce2.map(s2 => Dish.create(s2));
    return Promise.all(s2Promises);
  })
  .then(() => console.log("Database seeded!"))
  .catch(console.error);
