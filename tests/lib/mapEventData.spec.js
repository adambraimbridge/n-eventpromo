
const anEvent = require('../fixtures/liveEvent.json').eventpromos[0];
const mapEventData = require('../../src/lib/mapEventData');

describe('mapEventData()', () => {
	test('test it extract teaser details from eventpayload', () => {

		const subject = mapEventData(anEvent);

		const expectedUrl = new URL(anEvent.eventUrl);
		expectedUrl.searchParams.set('segmentId', anEvent.segmentId);

		expect(subject).toHaveProperty('id', anEvent.id);
		expect(subject).toHaveProperty('eventTitle', anEvent.title);
		expect(subject).toHaveProperty('mainImage', encodeURI(anEvent.imageUrl));
		expect(subject).toHaveProperty('eventUrl', expectedUrl.toString());
		expect(subject).toHaveProperty('eventStart', '12 June 2018');
		expect(subject).toHaveProperty('eventLocation', anEvent.location);
	});
});
