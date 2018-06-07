
const anEvent = require('../fixtures/liveEvent.json').eventpromos[0];
const mapEventData = require('../../src/lib/mapEventData');

describe('mapEventData()', () => {
	test('test it extract teaser details from eventpayload', () => {

		const subject = mapEventData(anEvent);

		expect(subject).toHaveProperty('id', anEvent.id);
		expect(subject).toHaveProperty('eventTitle', anEvent.prefLabel);
		expect(subject).toHaveProperty('mainImage', encodeURI(anEvent._imageUrl));
		expect(subject).toHaveProperty('eventUrl', anEvent.eventURL);
		expect(subject).toHaveProperty('eventStart', '12 June 2018');
		expect(subject).toHaveProperty('eventLocation', 'London');
	});
});
