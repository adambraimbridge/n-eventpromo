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

function hasValidConcepts (concepts) {
	const validKeys = ['focus', 'speakers'];
	const conceptIds = concepts.conceptIds;

	if (conceptIds) {
		for (const key of validKeys) {
			if ((key in conceptIds) && Array.isArray(conceptIds[key]) && conceptIds[key].length > 0) {
				return true;
			}
		}
	}

	return false;
}
async function eventPromoInit () {
	const promoDataSelector = document.querySelector('.js-event-promo-data');
	const promoSlotSelector = document.querySelector('.js-event-promo');

	if (!promoDataSelector || !promoSlotSelector) {
		throw new Error('no dom for eventpromo');
	}

	const concepts = JSON.parse(promoDataSelector.innerHTML);
	if (!concepts || !hasValidConcepts(concepts)) {
		throw new Error('no valid concept ids for eventpromo');
	}

	let promoEvents;
	try {
		promoEvents = await eventPromo.getEventsFromApi(concepts);
	}
	catch (err) {
		throw new Error('failed to fetch eventpromos');
	}

	if (!Array.isArray(promoEvents.eventpromos) || !promoEvents.eventpromos.length) {
		throw new Error('no eventpromo match for this event');
	}

	const mappedEvent = mapEventData(promoEvents.eventpromos[0]);
	promoSlotSelector.innerHTML = template(mappedEvent);

	return true;
}

module.exports = eventPromoInit;
