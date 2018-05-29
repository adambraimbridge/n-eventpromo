const moment = require('moment');
const eventPromo = require('./event-promo-client');
const template = require('../templates/inarticle.html');

function mapEventData (theEvent) {
	if (! theEvent) {
		throw new Error('no event');
	}

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

module.exports = async () => {
	const promoSlot = document.querySelector('.js-event-promo');

	if (document.querySelector('.js-event-promo-data')) {
		const concepts = JSON.parse(document.querySelector('.js-event-promo-data').innerHTML);

		try {
			const promoEvents = await eventPromo.getEventsFromApi(concepts);
			const mappedEvent = mapEventData(promoEvents.eventpromos[0]);

			promoSlot.innerHTML = template(mappedEvent);
		}
		catch (err) {
			//fail silently
			return false;
		}

		return true;
	}
};
