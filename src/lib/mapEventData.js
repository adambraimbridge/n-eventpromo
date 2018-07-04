const oDate = require('o-date');

const staticAssets = 'https://www.ft.com/__assets/creatives/better-promo/';

module.exports = (theEvent, variant) => {
	const eventUrl = new URL(theEvent.eventUrl);

	//AB test logic remove/refactor on test conclusion
	let images = [];
	let showVariant = false;

	if(variant === 'variant') {
		showVariant = true;
		images.push(
			theEvent.imageUrl,
			`${staticAssets}event_break_out.jpg`,
			`${staticAssets}event_clapping_hands.jpg`);
	}

	eventUrl.searchParams.set('segmentId', theEvent.segmentId);

	return {
		id: theEvent.id,
		eventTitle: theEvent.title,
		mainImage: encodeURI(theEvent.imageUrl),
		eventStart: oDate.format(theEvent.scheduledStartTime, 'dd MMMM yyyy'),
		eventUrl: eventUrl.toString(),
		segmentId: theEvent.segmentId,
		eventLocation: theEvent.location,
		images,
		showVariant
	};
};
