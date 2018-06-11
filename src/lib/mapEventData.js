const oDate = require('o-date');

module.exports = (theEvent) => {
	return {
		id: theEvent.id,
		eventTitle: theEvent.prefLabel,
		mainImage: encodeURI(theEvent._imageUrl),
		eventStart: oDate.format(theEvent.scheduledStartTime, 'dd MMMM yyyy'),
		eventUrl: theEvent.eventURL,
		eventLocation: 'London' //TODO get this from the tags
	};
};
