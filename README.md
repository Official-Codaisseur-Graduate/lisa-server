## Introduction
This is an API for Vitalis Menu editor. This server is also a connection to the google API and DialogFLow.

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
