const fetchMock = require('fetch-mock');
const eventPromo = require('../../src/lib/event-promo-client');
const concepts = require('../fixtures/conceptFixture');
const liveEvent = require('../fixtures/liveEvent');

afterEach(() => {
	fetchMock.restore();
});

describe('Unit tests: getEventsFromApi()', async () => {
	test('should get events on success', async () => {
		fetchMock.post('/eventpromo/api/', liveEvent);
		const subject = await eventPromo.getEventsFromApi(concepts);
		expect(subject).toEqual(liveEvent);
	});

	test('should get events on success when called with no concepts', async () => {
		fetchMock.post('/eventpromo/api/', liveEvent);
		const subject = await eventPromo.getEventsFromApi();
		expect(subject).toEqual(liveEvent);
	});

	describe('should raise errors', async () => {

		test('when we fail to get response from api', async () => {
			const error = new Error('some network failure');
			fetchMock.post('/eventpromo/api/', {throws: error});

			try {
				await eventPromo.getEventsFromApi(concepts);
			} catch (e) {
				expect(e.message).toEqual('failed to fetch eventpromos from enventpromo-api');
			}
		});

		test('when response from api cannot be parsed', async () => {
			const fakeResponse = { status: 200, body: 'invalid json data'};
			fetchMock.post('/eventpromo/api/', fakeResponse);

			try {
				await eventPromo.getEventsFromApi(concepts);
			} catch (e) {
				expect(e.message).toMatch('failed to parse response from enventpromo-api');
			}
		});
	});
});
