# n-eventpromo
This module is currently a POC and behind the feature next  `showEventPromo`.

Shared configuration and templates for ft live event promotions on ft.com

## Install
----

Add the component:

`npm install @financial-times/n-eventpromo`

`bower install n-eventpromo`

## Usage
---

`import { init as eventPromoInit } from 'n-eventpromo'`

Then include in your client side code with a flag conditional. So something like this:


	if(local.flags.showEventPromo) {
		eventPromoInit(rootEl)
	}

In the template the component should be included as follows:

    `{{#if @root.flags.showEventPromo}}
            <script class="js-event-promo-data" type="application/json">{{{json eventTags}}}</script>
            <div class="event-promo js-event-promo" data-trackable="event-promo">
            </div>
            {{/if}}
    `

The POC of this Ui component will render if the following two conditions are meet:
1. feature flag showEventPromo = true
2. The 'js-event-promo-data' script tag is populated with eventTags object with the class of as follows.


Example eventTags object:

    '{
        "conceptIds": {
            "focus": ["uuid","uuid" ...],
            "speakers": ["uuid","uuid" ...]
        }
    }'

## Demo page
`$ make demo`: Serves examples of the component locally (http://localhost:5005), using dummy data and in isolation from an app.

This is done on a simple express app which renders a single demo page that calls the partials to exhibit, populating them with data from a fixture.