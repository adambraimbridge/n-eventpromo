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
			`${staticAssets}break_out.jpg`,
			`${staticAssets}audiance_clapping.jpg`,
			theEvent.imageUrl);
	}

	eventUrl.searchParams.set('segmentId', theEvent.segmentId);
	eventUrl.searchParams.set('variant', showVariant);

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
