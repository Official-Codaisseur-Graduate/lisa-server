## Contents of this README file:

- Introduction
- All repositories in the LISA-project
- Features Overview
- Installation
- Authentication
- Rate limit
- Suggestions for the next group to work on this project (keep up-to-date!)

# Introduction

This repository is the version control system of the backend version of the LISA Voice Assistant Project developed for the Vitalis Woonzorg Group.
This project uses Express server, Sequelize ORM, geo-library and actions-on-google library. 
**Rein Op 't Land** is the Product Owner (PO) of this project.

## Repositories in the LISA-project

Read the Docs for set-up and the latest status of the code. Make sure to write code in the correct branch (development or any open branches that hasn't been merged into development yet). Only merge into the master branch if all the code in development works and you've checked with the PO.

- LISA-server - you are here!
- [LISA-client](https://github.com/Official-Codaisseur-Graduate/lisa-client)
- [LISA Dialogflow](https://github.com/Official-Codaisseur-Graduate/lisa-client-dialogflow/)

## Features Overview

With this RESTful API, a user can:

- Add and retrieve dishes, dish-types, menus and locations from the database,
- Add dishes to the menu for a specific date,
- Retrieve all dishes from the menu for that date,
- Retrieve all dishes from the menu for that week,
- Delete dishes for a specific date.

Through **Dialogflow** a user can:

- Set and change location
- Retrieve types of dishes for specific dates - by asking Google Assistant for the menu

Through **LISA-client** a user (kitchen chef) can:

- Interact with backend through user interface - add dishes and menus for specific location

## Installation

1. Start a Postgres database in a docker container with the following command:

   ```
   $ docker run --rm -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres
   ```
   
   To connect to the Database on a Mac you can use [Postico](https://eggerapps.at/postico/), on Linux - [DBeaver](https://dbeaver.io/)

2. Install the LISA-server and run it

   ```
   $ git clone
   $ cd ./lisa-server
   $ git checkout development
   $ npm install
   $ node . or nodemon .
   ```

3. Set up the front-end. The client and instructions can be found [here](https://github.com/Official-Codaisseur-Graduate/lisa-client).

4. Set up the DialogFlow front-end. The instructions can be found [here](https://github.com/Official-Codaisseur-Graduate/lisa-client-dialogflow)

## Authentication

At the moment there is no authentication on this API - all functions are available to all users.

## Rate limit

No limit on number of requests

## Suggestions - last edit: December 2019

- **priority**: rewrite the _dishTypeData_ file to use async-await (e.g. like in the _locationData_ file). Because dishTypeData is not created asynchronously, on each start of the database dishTypes are created in random order and receive different IDs. That in turn disrupts creation of dishes and menus and contributes to faulty UX.

- The latest working version of the project exists on the DEVELOPMENT branch. Consult the PO and Merge the branch to MASTER - then deploy to Heroku.

- Discuss the possibility to restructure the model relations in the project with the PO. Refer to _modelRelations_ file for suggestions. Right now, e.g. Location.hasOne(Dish) and Dish.belongsTo(Location), which appears counterintuitive.

- Keep in mind that some locations are registered under one address(refer to _locationData_ file and share the kitchen and the menu. In order to make a menu available to multiple locations - you might want to use many-to-many relation. Right now, Location.hasOne(Menu).

- For a simpler database structure, you might want to remove a distinction between dishTypes 1 and 2.

- If the PO agrees, you can add authentication which connects a user with the location(s) where they work, so they don't have to see the drop down list in the client for all the other locations.
- _Seeds.js_ file contains test data (dish types) for location id 6 - if you change model relations - this file will need editing.

- You might want to change route paths on the back and front-end to Dutch language version (e.g. "router.post('/createDish'" to "/gerechtMaken".

- Test all the used routes (some, like PUT route in the Dish router, are not yet used in the project).