
const eventPromo = require('./event-promo-client');
const mapEventData = require('./lib/mapEventData');
const hasValidConcepts = require('./lib/hasValidConcept');
const template = require('../templates/inarticle.html');

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
