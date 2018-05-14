//import {broadcast} from 'n-ui-foundations';
//const lazyLoadImages = require('n-image').lazyLoad;
const template = require('../templates/event-promo-inarticle.html');

function mapEventData(theEvent) {
	return new Promise((resolve, reject) => {
		if(theEvent) {
			console.log(typeof theEvent);
			console.log(theEvent.prefLabel);
			const mappedEvent = {
				id: theEvent.id,
				title: theEvent.prefLabel,
				cta: theEvent.eventDetailsUrl,
				mainImage: theEvent._imageUrl,
				start: theEvent.scheduledStartTime,
				eventUrl: theEvent.eventURL,
				eventFocus: 'Brexit' //TODO get this from the data returned
			}
			resolve(mappedEvent);
		} else {
			reject('no event');
		}

	});
}

module.exports.init = () => {

	//How do we define which slot to be used?
	const promoSlot = document.querySelector('.js-event-promo');
	let theEvent;

	if(document.querySelector('.js-event-promo-data')) {
		const theEvent = JSON.parse(document.querySelector('.js-event-promo-data').innerHTML);
		console.log(theEvent);

		return mapEventData(theEvent)
		.then((eventData) => {
			console.log(eventData);
			return promoSlot.innerHTML = template(eventData);
		})
		.catch(() => {
			console.log('reject');
			return;
		});
	}

	// if(!theEvent) {
	// 	console.log(theEvent);
	// 	return;
	// }



};
