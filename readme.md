## Introduction
This is an API for Vitalis Menu editor. This server is also a connection to the google API and DialogFLow.

## Overview
With this API, a user can:
* add and retrieve dishes and types from the database,
* add dishes to the menu for a specific date,
* retrieve all dishes from the menu for that date,
* retrieve all dishes from the menu for that week,
* delete dishes for a specific date.

## Installation

To run the server locally, you need to start a Postgres container with the following command:
```
$ docker run \
  --rm \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  postgres
  ```

Then:
* git clone 
* npm install
* node .

To connect to the Database on a Mac you can use [Postico](https://eggerapps.at/postico/), on Linux - [DBeaver](https://dbeaver.io/)

A nice tool to use while developing is Serveo. https://serveo.net/
This streams your server to the adress Serveo sets up for you, this Adress you can also use in DialogFlow/fulfillment.
The link look likes this:(this one does not work)
https://dialogflow.cloud.google.com/#/agent/<random numbers and letters>/fulfillment

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


## Error Codes
All the regular error codes

## Rate limit
No limit on number of requests

[Read about Dialogflow, WebHooks and all the wonderful Google Assistance stuff here](dialogflow-README/README.md)
s