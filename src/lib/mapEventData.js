const oDate = require('o-date');

const staticAssets = 'https://www.ft.com/__assets/creatives/better-promo/';

module.exports = (theEvent) => {
	const eventUrl = new URL(theEvent.eventUrl);
	const images = [encodeURI(theEvent.imageUrl), encodeURI(`${staticAssets}/event_break_out.jpg`), encodeURI(`${staticAssets}/event_clapping_hands.jpg`)];


	eventUrl.searchParams.set('segmentId', theEvent.segmentId);

	return {
		id: theEvent.id,
		eventTitle: theEvent.title,
		mainImage: encodeURI(theEvent.imageUrl),
		eventStart: oDate.format(theEvent.scheduledStartTime, 'dd MMMM yyyy'),
		eventUrl: eventUrl.toString(),
		segmentId: theEvent.segmentId,
		eventLocation: theEvent.location,
		staticImage: ['event_break_out.jpg', 'event_clapping_hands.jpg'],
		images
	};
};
