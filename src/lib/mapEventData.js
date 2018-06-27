const oDate = require('o-date');

module.exports = (theEvent) => {
	return {
		id: theEvent.id,
		eventTitle: theEvent.title,
		mainImage: encodeURI(theEvent.imageUrl),
		eventStart: oDate.format(theEvent.scheduledStartTime, 'dd MMMM yyyy'),
		eventUrl: theEvent.eventUrl,
		eventLocation: theEvent.location
	};
};
