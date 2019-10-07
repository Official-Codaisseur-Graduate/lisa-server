## PLEASE READ [INITIAL SETUP](https://github.com/Official-Codaisseur-Graduate/lisa-client/blob/master/InitialSetup.md) FIRST

## What is Dialogflow?
Dialogflow (formerly Api.ai) is a Google-owned developer of human–computer interaction technologies based on natural language conversations. You can develope a virtual buddy for Android, iOS, and Windows Phone smartphones that performs tasks and answers users’ question in a natural language. It also created a natural language processing engine that incorporates conversation context like dialogue history, location and user preferences.

## What is an Agent?
Agent means it’s your virtual buddy, chatbot or we can say that Project folder. Create New Agent like Menu, Weather, Coffee shop.

## What is Intent?
An intent maps what a user says with what your agent does. This first intent will cover when the user asks for the menu.

Examples:

* What’s the menu for today?
* What is today’s menu?
* What’s for dinner tomorrow?
* Tell me menu about Friday.

In the last three examples you’ll notice the words today and tomorrow are highlighted with one color.  This means they were annotated as parameters that are assigned to existing date system entities. These date  parameters allow Dialogflow to understand other dates the user may say, and not just “today”, “tomorrow”, and “Friday”.

## What is an Entity?

An Entity is a property which can be used by Dialogflow to answer the request from the user — the entity will usually be a keyword within the request such as a name, date, location etc.In our Project is Menu have various type like Salad, Soup, Meat and Dessert. So all type of menus we create in entites by giving name MenuType.

How Dialogflow connects with Backend Api

![dialoglow-to-backend.jpg](./dialoglow-to-backend.jpg)

## What is a Webhook?

When you are working with custom backend like Node.js with Express, you need to:
* turn on the option Enable webhook, and
* call for slot filling in the Fulfillment section of the intent.

![Webhook option.png](./Webhook-option.png)
![webhook-api.png](./webhook-api.png)

## What is Fulfillment?

Dialogflow receives a request from the user (along with the entity values to be sent with the request) and now needs to request the information from the database to fulfill the user request. Now this data will be sent to our webhook so that the required information can be fetched (this will be dependant on your implementation). Once the web-hook has fetched our required information it will send it back to Dialogflow so that it can be presented to the user in the desired manner.

In our Project our response form uses API ‘/hooks’ and we deploy our backend on Heroku.

![webhook-fulfimment.png](./webhook-fulfimment.png)

More Information for Dialogflow: 
https://dialogflow.com/docs
