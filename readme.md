## PLEASE READ [INITIAL SETUP](https://github.com/Official-Codaisseur-Graduate/lisa-client/blob/master/InitialSetup.md) FIRST


## Introduction
This is an API for Vitalis Menu editor. Check out the deployed version of the full app here:

https://lisa-client.herokuapp.com/

## Overview
With this API, a user can:
* add and retrieve dishes and types from the database,
* add dishes to the menu for a specific date,
* retrieve all dishes from the menu for that date,
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

## Authentication
There is no authentication on this API - all functions available to all users.

## Routes

Here is how you might retrieve a menu for a date with a GET request.

'https://radiant-brook-39260.herokuapp.com/menus/?date=2019-06-27'

Response will be in a JSON format as:

`<[{"id":62,"dish_name":"Cauliflower soup","type_name":"Soup","date":"2019-06-27"},{"id":63,"dish_name":"Duck breast","type_name":"Main course","date":"2019-06-27"},{"id":64,"dish_name":"Honey glazed carrots","type_name":"Vegetables","date":"2019-06-27"},{"id":65,"dish_name":"Sweet potato","type_name":"Side dish","date":"2019-06-27"},{"id":66,"dish_name":"Swiss roll","type_name":"Dessert","date":"2019-06-27"}]>`

Here is how you might add a dish for a date with a POST request. In your request, include a JSON object as:

`<{type_name: "Vegetables", dish_name: "Parsnips", date: null}>`

'https://radiant-brook-39260.herokuapp.com/menus/

## Error Codes
All the regular error codes

## Rate limit
No limit on number of requests

[Read about Dialogflow, WebHooks and all the wonderful Google Assistance stuff here](dialogflow-README/README.md)
