const anEvent = require('../fixtures/liveEvent.json').eventpromo;
const imageArrayFixture = require('../fixtures/imagesArray');
const mapEventData = require('../../src/lib/mapEventData');

describe('mapEventData()', () => {
	test('test it extract teaser details from eventpayload', () => {
		const subject = mapEventData(anEvent);

		const expectedUrl = new URL(anEvent.eventUrl);

        expect(subject).toHaveProperty('id', anEvent.id);
        expect(subject).toHaveProperty('title', anEvent.title);
        expect(subject).toHaveProperty('image1', imageArrayFixture[0]);
        expect(subject).toHaveProperty('image2', imageArrayFixture[1]);
        expect(subject).toHaveProperty('image3', imageArrayFixture[2]);
        expect(subject).toHaveProperty('link', expectedUrl.toString());
        expect(subject).toHaveProperty('dates', '12 June 2018');
        expect(subject).toHaveProperty('location', anEvent.location);
        expect(subject).toHaveProperty('segmentId', anEvent.segmentId);

	//Relevant to AB test probably ok to remove amend on conclusion.
	test('test provides the correct control properties', () => {

		const subject = mapEventData(anEvent);
		const expectedUrl = new URL(anEvent.eventUrl);

		expectedUrl.searchParams.set('segmentId', anEvent.segmentId);


        expect(subject).toHaveProperty('image1', imageArrayFixture[0]);
        expect(subject).toHaveProperty('image2', imageArrayFixture[1]);
        expect(subject).toHaveProperty('image3', imageArrayFixture[2]);
    });

	test('test provides the correct control properties', () => {

		const subject = mapEventData(anEvent, 'variant');
		const expectedUrl = new URL(anEvent.eventUrl);
		expectedUrl.searchParams.set('segmentId', anEvent.segmentId);


        expect(subject).toHaveProperty('image1', imageArrayFixture[0]);
        expect(subject).toHaveProperty('image2', imageArrayFixture[1]);
        expect(subject).toHaveProperty('image3', imageArrayFixture[2]);
    });

	test('test it sets date range if start and end dates differ', () => {
		anEvent.scheduledEndTime = '2018-06-14T07:00:00.000Z';
		const subject = mapEventData(anEvent);

		expect(subject).toHaveProperty('dates', '12 June - 14 June 2018');
	});
});
