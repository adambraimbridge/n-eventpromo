const moment = require('moment');

module.exports = (theEvent) => {
	return {
		id: theEvent.id,
		eventTitle: theEvent.prefLabel,
		mainImage: encodeURI(theEvent._imageUrl),
		eventStart: moment(theEvent.scheduledStartTime).format('D MMMM YYYY'),
		eventUrl: theEvent.eventURL,
		eventLocation: 'London' //TODO get this from the tags
	};
};
