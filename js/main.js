//import {broadcast} from 'n-ui-foundations';
//const lazyLoadImages = require('n-image').lazyLoad;
const moment = require('moment');
const template = require('../templates/event-promo-inarticle.html');

function mapEventData(theEvent) {
	return new Promise((resolve, reject) => {
		if(theEvent) {
			const mappedEvent = {
				id: theEvent.id,
				title: theEvent.prefLabel,
				cta: theEvent.eventDetailsUrl,
				mainImage: encodeURI(theEvent._imageUrl),
				start: moment(theEvent.scheduledStartTime).format('D MMMM YYYY'),
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

	if(document.querySelector('.js-event-promo-data')) {
		const theEvent = JSON.parse(document.querySelector('.js-event-promo-data').innerHTML);

		return mapEventData(theEvent)
		.then((eventData) => {
			return promoSlot.innerHTML = template(eventData);
		})
		.catch(() => {
			return;
		});
	}
};
