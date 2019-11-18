# Introduction
This repository is the version control system of the back-end version of the LISA Voice Assistant Project.

## Contents of this ReadMe-file
- Introduction
- Repositories in the LISA-project
- Overview
- Installation Guide
- Authentication
- Routes
- Rate limit
- Suggestions for the next group to work on this project (keep up-to-date!)

## Repositories in the LISA-project
Read the Docs for set-up and the latest status of the code - make sure to be in the correct branch (development or any open branches that hasn't been merged into development yet). Only merge into the master branch if all the code in development is working and you've checked with Rein, because the master branch is already in production.<br>
<br>
- LISA-server - you are here!
- [LISA-client](https://github.com/Official-Codaisseur-Graduate/lisa-client)
- [LISA Dialogflow](https://github.com/Official-Codaisseur-Graduate/lisa-client-dialogflow/)

## Overview
With this API, a user can:
* Add and retrieve dishes and types from the database,
* Add dishes to the menu for a specific date,
* Retrieve all dishes from the menu for that date,
* Retrieve all dishes from the menu for that week,
* Delete dishes for a specific date.

Through Dialogflow, a user can:
* Set location
* Remove location
* Retrieve types of dishes for specific dates

## Installation

1) Start a Postgres database in a docker container with the following command:
    ```
    $ docker run --rm -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres
    ```
    To connect to the Database on a Mac you can use [Postico](https://eggerapps.at/postico/), on Linux - [DBeaver](https://dbeaver.io/)

2) Install the server and run it
    ```
    $ git clone
    $ cd ./lisa-server
    $ git checkout development
    $ npm install
    $ node .
    ```

3) Set up the front-end. The client and instructions can be found [here](https://github.com/Official-Codaisseur-Graduate/lisa-client).

4) Set up the DialogFlow front-end. The instructions can be found [here](https://github.com/Official-Codaisseur-Graduate/lisa-client-dialogflow)

## Authentication
There is no authentication on this API - all functions available to all users.

## Routes
Here is how you might retrieve a menu for a date with a GET request.

Response will be in a JSON format as:

`
  [ menus {
    dataValues:
     { id: 5,
       dish_name: 'soep',
       type_name: 'Voorgerecht 1',
       date: '2019-10-07',
       week: 41 },
  {
    dataValues:
     { id: 6,
       dish_name: 'stamppot',
       type_name: 'Hoofdgerecht 2',
       date: '2019-10-07',
       week: 41 },  
  ]
`
Here is how you might add a dish for a date with a POST request. In your request, include a JSON object as:

`{type_name: "Voorgerecht 1", dish_name: "Parsnips", date: 2019-10-07, week:41}`

## Rate limit
No limit on number of requests

## Suggestions
- If the product owner agrees with it, you can add authentication which connects a user with the location(s) where they work, so they don't have to see the drop down list in the client for all the other locations. 
 - Routing for editing dishes
 - If a user doesn't want to share his/her location, add a feature that the Voice Assistant asks for the name of the retirement home, to go from there.
 - Some locations have the same zipcode and therefore coordinates. 
   - It might be trouble if two locations are found based on the location finder. Test what will happen if two locations are found.
   - The location with the same zip code, have the same menu, because they share the same kitchen (according to @Pittvandewitt who talked to the product owner of this project). Maybe you can think of something more efficient, because now you have to create a menu for all the locations even when they share a kitchen.
- Test if you could ask for a menu on a specific date (not "tomorrow" but "the fifth of December", "next week", etc.)
- Test everything thoroughly to make sure everything works.