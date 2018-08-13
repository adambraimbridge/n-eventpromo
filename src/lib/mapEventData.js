const config = require('../config');
const setDate = require('./event-date');

module.exports = (theEvent) => {
	const eventUrl = new URL(theEvent.eventUrl);
	const images = [...config.animationStaticImages, theEvent.imageUrl];

	eventUrl.searchParams.set('segmentId', theEvent.segmentId);

	return {
		dates: setDate(theEvent),
		id: theEvent.id,
		image1: images[0],
		image2: images[1],
		image3: images[2],
		link: eventUrl.toString(),
		location: theEvent.location,
		segmentId: theEvent.segmentId,
		title: theEvent.title
	};
};
