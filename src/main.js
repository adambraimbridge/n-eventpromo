const moment = require('moment');
const eventPromo = require('./event-promo-client');
const template = require('../templates/inarticle.html');

function mapEventData (theEvent) {
	const mappedEvent = {
		id: theEvent.id,
		eventTitle: theEvent.prefLabel,
		cta: theEvent.eventDetailsUrl,
		mainImage: encodeURI(theEvent._imageUrl),
		eventStart: moment(theEvent.scheduledStartTime).format('D MMMM YYYY'),
		eventUrl: theEvent.eventURL,
		eventLocation: 'London' //TODO get this from the tags
	};
	return mappedEvent;
}

async function eventPromoInit () {
	const promoSlot = document.querySelector('.js-event-promo');

	if (document.querySelector('.js-event-promo-data')) {
		const concepts = JSON.parse(document.querySelector('.js-event-promo-data').innerHTML);

		let promoEvents;
		try {
			promoEvents = await eventPromo.getEventsFromApi(concepts);
		}
		catch (err) {
			throw new Error('failed to fetch eventpromos');
		}

		if (! Array.isArray(promoEvents.eventpromos) || !promoEvents.eventpromos.length) {
			throw new Error('no eventpromo match for this event');
		}

		const mappedEvent = mapEventData(promoEvents.eventpromos[0]);
		promoSlot.innerHTML = template(mappedEvent);

		return true;
	}
}

module.exports = eventPromoInit;
