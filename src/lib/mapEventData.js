const oDate = require('o-date');

module.exports = (theEvent) => {
	const eventUrl = new URL(theEvent.eventUrl);
	eventUrl.searchParams.set('segmentId', theEvent.segmentId);

	return {
		id: theEvent.id,
		eventTitle: theEvent.title,
		mainImage: encodeURI(theEvent.imageUrl),
		eventStart: oDate.format(theEvent.scheduledStartTime, 'dd MMMM yyyy'),
		eventUrl: eventUrl.toString(),
		segmentId: theEvent.segmentId,
		eventLocation: theEvent.location
	};
};
