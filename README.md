# n-eventpromo
This module is currently a POC and behind the feature next  `showEventPromo`.

Shared configuration and templates for ft live event promotions on ft.com

## Install
----

Add the component:

`npm install @financial-times/n-eventpromo`

## Usage
---

`import { init as eventPromoInit } from 'n-eventpromo'`

Then include in your client side code with a flag conditional. So something like this:


	if(local.flags.showEventPromo) {
		eventPromoInit()
	}


The POC of this Ui component will render if the following two conditions are true.
1. feature flag showEventPromo = true
2. There is an event object with the class of 'event-promo-js' in a script tag as follows.

`<script class="event-promo-js"type="application/json">
	</script>`

The event object example is expected to have the following properties:

	`{
		id: 'event uuid' ,
		title: 'the prefLabel',
		mainImage: 'image url',
		start: 'date in the following format D MMMM YYYY',
		location: 'city'
		eventUrl: `eventURL from the live ft site' ,
	}`


## Demo page
`$ make demo`: Serves examples of the component locally (http://localhost:5005), using dummy data and in isolation from an app.

This is done on a simple express app which renders a single demo page that calls the partials to exhibit, populating them with data from a fixture.