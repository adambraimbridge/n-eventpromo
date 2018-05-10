//import {broadcast} from 'n-ui-foundations';
//const lazyLoadImages = require('n-image').lazyLoad;
//const eventPromoClient = require('./eventpromo-client');
//const template = require('../templates/event-promo-inarticle');

module.exports.init = () => {

	//How do we define which slot to be used?
	//const promoSlots = document.querySelectorAll('.js-event-promo');
	const promoSlot = document.querySelector('.js-event-promo');
	const eventTags = document.querySelector('#js-event-promo-data').innerHTML;

	// if(eventTags) {

	// 	eventPromoClient(eventTags)
	// 	.then((event) => {
	// 		//return the basics for rendering an event
	// 		if (event === undefined) {
	// 			return;
	// 		}

	// 		return {
	// 			id: event.id,
	// 			title: event.prefLabel,
	// 			cta: event.eventDetailsUrl,
	// 			mainImage: event._imageUrl,
	// 			start: event.scheduledStartTime,
	// 			eventUrl: event.eventURL,
	// 			eventFocus: 'Brexit' //TODO get this from the data returned
	// 		};

	// 	}).then(eventData => {
	// 		if(!eventData) {
	// 			return;
	// 		}
	// 		promoSlot.innerHTML = template(eventData);
	// 	})
	// 	.catch(error => {
	// 		throw error;
	// 	});
	// }

	return;
};
