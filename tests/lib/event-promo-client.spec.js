const fetchMock = require('fetch-mock');
const eventPromo = require('../../src/lib/event-promo-client');
const concepts = require('../fixtures/conceptFixture');
const liveEvent = require('../fixtures/liveEvent');
describe('eventPromo', async () => {
	test('getEventsFromApi()', async () => {
		fetchMock.post('/eventpromo/api/', liveEvent);
		const subject = await eventPromo.getEventsFromApi(concepts);
		expect(subject).toEqual(liveEvent);
		fetchMock.restore();
	});

	test('getEventsFromApi() failed response', async () => {
		fetchMock.post('/eventpromo/api/', {status: 503});

		try {
			await eventPromo.getEventsFromApi(concepts);
		} catch (e) {
			expect(e.message).toMatch('failed to parse response from enventpromo-api');
		}

	});
});
