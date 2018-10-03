const eventpromoClient = require('./lib/event-promo-client');
const mapEventData = require('./lib/mapEventData');
const hasValidConcepts = require('./lib/hasValidConcept');
const animationToggle = require('./lib/animation-control');
const template = require('../templates/inarticle.html');
let theme = 'event-promo-dark';
//let template;

async function eventPromoInit (rootEl) {
	const promoDataSelector = rootEl.querySelector('.js-event-promo-data');
	const promoSlotSelector = rootEl.querySelector('.js-event-promo');

	if (!promoDataSelector || !promoSlotSelector) {
		throw new Error('no dom for eventpromo');
	}

	const concepts = JSON.parse(promoDataSelector.innerHTML);
	if (!concepts || !hasValidConcepts(concepts)) {
		throw new Error('no valid concept ids for eventpromo');
	}

	let eventpromoClientResponse;
	try {
		eventpromoClientResponse = await eventpromoClient.getEventsFromApi(concepts);
	}
	catch (err) {
		throw new Error('failed to fetch eventpromos');
	}

	if (! eventpromoClientResponse.hasOwnProperty('eventpromo')
		|| ! typeof eventpromoClientResponse.eventpromo === 'object'
		|| Object.keys(eventpromoClientResponse.eventpromo) === 0
	) {
		throw new Error('no eventpromo match for this event');
	}

	const mappedEvent = mapEventData(eventpromoClientResponse.eventpromo);

	promoSlotSelector.classList.add(theme);
	promoSlotSelector.innerHTML = template(mappedEvent);

	animationToggle();

	return true;
}

module.exports = eventPromoInit;
