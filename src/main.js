const eventPromo = require('./lib/event-promo-client');
const mapEventData = require('./lib/mapEventData');
const hasValidConcepts = require('./lib/hasValidConcept');
const animationToggle = require('./lib/animation-control');
const template = require('../templates/inarticle_dark.html');

async function eventPromoInit (rootEl) {
	const promoDataSelector = rootEl.querySelector('.js-event-promo-data');
	const promoSlotSelector = rootEl.querySelector('.js-event-promo');
	const showVariant = window.FT.flags.eventPromoVariantTest || false;

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

	const mappedEvent = mapEventData(promoEvents.eventpromos[0], showVariant);
	promoSlotSelector.innerHTML = template(mappedEvent);

	if(showVariant) {
		animationToggle();
	}

	return true;
}

module.exports = eventPromoInit;
