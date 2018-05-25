const moment = require('moment');
const eventPromo = require('./event-promo-client');
const template = require('../templates/inarticle.html');

function mapEventData(theEvent) {
	return new Promise((resolve, reject) => {
		if (theEvent) {
			const mappedEvent = {
				id: theEvent.id,
				eventTitle: theEvent.prefLabel,
				cta: theEvent.eventDetailsUrl,
				mainImage: encodeURI(theEvent._imageUrl),
				eventStart: moment(theEvent.scheduledStartTime).format('D MMMM YYYY'),
				eventUrl: theEvent.eventURL,
				eventLocation: 'London' //TODO get this from the tags
			}
			resolve(mappedEvent);
		} else {
			reject('no event');
		}

	});
}

module.exports = () => {

	//How do we define which slot to be used?
	const promoSlot = document.querySelector('.js-event-promo');

	if (document.querySelector('.js-event-promo-data')) {
		const concepts = JSON.parse(document.querySelector('.js-event-promo-data').innerHTML);

		eventPromo.getEventsFromApi(concepts)
		.then(promoEvents => {
			return promoEvents.eventpromos[0];
		})
		.then(mapEventData)
		.then(mappedEvent => {
			return promoSlot.innerHTML = template(mappedEvent);
		})
		.catch(() => {
			//fail silently
			return;
		});
	}
};
