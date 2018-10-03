const config = require('../config');
const setDate = require('./event-date');

module.exports = (theEvent) => {
	const eventUrl = new URL(theEvent.eventUrl);
	const images = [...config.animationStaticImages, theEvent.imageUrl];

	eventUrl.searchParams.set('segmentId', theEvent.segmentId);

	return {
		id: theEvent.id,
		eventTitle: theEvent.title,
		mainImage: encodeURI(theEvent.imageUrl),
		eventDate: setDate(theEvent),
		eventUrl: eventUrl.toString(),
		segmentId: theEvent.segmentId,
		eventLocation: theEvent.location,
		images,
		strapline: theEvent.strapline
	};
};
