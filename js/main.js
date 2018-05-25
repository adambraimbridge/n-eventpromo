//import {broadcast} from 'n-ui-foundations';
//const lazyLoadImages = require('n-image').lazyLoad;
const moment = require('moment');
const eventPromoClient = require('./event-promo-client');
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

		eventPromoClient(concepts)
		.then((anEvent) => {
			console.log(anEvent);
			return anEvent;
		})
		.then(mapEventData)
		.then(mappedEvent => {
			console.log(mappedEvent)
			return promoSlot.innerHTML = template(mappedEvent);
		});


		//TODO replace with the return value of eventPromoClient
		// return mapEventData(concepts)
		// 	.then((eventData) => {
		// 		return promoSlot.innerHTML = template(eventData);
		// 	})
		// 	.catch(() => {
		// 		return;
		// 	});
	}
};
