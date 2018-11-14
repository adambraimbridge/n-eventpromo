const {JSDOM} = require('jsdom');
const fetchMock = require('fetch-mock');
const config = require('../src/config');
const {eventPromoInit} = require('../src/index');

//fixtures
const conceptFixture = JSON.stringify(require('./fixtures/conceptFixture.json'));
const emptyConceptFixture = JSON.stringify({'conceptIds': {'focus': [], 'speakers': []}});
const eventPromoDataEl = `<script class="js-event-promo-data" type="application/json">${conceptFixture}</script>
<div class="event-promo js-event-promo" ></div>`;
const eventPromoDataElNoData = `<script class="js-event-promo-data" type="application/json">${emptyConceptFixture}</script>
<div class="event-promo js-event-promo" ></div>`;
const noEventPromo = '<div class="no-event"></div>';
const liveEvent = require('./fixtures/liveEvent.json');

let dom = new JSDOM('<!DOCTYPE html><div class="event-promo-container"></div>');
let document = dom.window.document;


describe('Unit tests: main', () => {

	beforeEach(() => {
		global.FT = {
			flags: {}
		};
	});

	afterEach(() => {
		fetchMock.restore();
	});

	describe('eventPromoInit method', () => {

		describe('error cases', () => {

			describe('when dom missing', () => {
				const uuid = '000';
				test('should throw error when .js-even-promo-data missing', async () => {
					const eventContainer = document.querySelector('.event-promo-container');
					eventContainer.innerHTML = noEventPromo;

					let hasError = false;
					try {
						await eventPromoInit(document, uuid);
					}
					catch (err) {
						hasError = true;
						expect(err.message).toEqual('no dom for eventpromo');
					}
					expect(hasError).toEqual(true);
				});
				test('should throw error when .js-even-promo missing', async () => {
					const eventContainer = document.querySelector('.event-promo-container');
					eventContainer.innerHTML = noEventPromo;

					let hasError = false;
					try {
						await eventPromoInit(document, uuid);
					}
					catch (err) {
						hasError = true;
						expect(err.message).toEqual('no dom for eventpromo');
					}
					expect(hasError).toEqual(true);
				});
			});
			describe('when concepts are invalid', () => {
				const uuid = '';
				[
					{
						desc: 'when concepts are empty and no uuid exists',
						dom: '<script class="js-event-promo-data" type="application/json">{}</script>' +
						'<div class="event-promo js-event-promo" ></div>'
					},
					{
						desc: 'concepts keys are empty and no uuid exists',
						dom: '<script class="js-event-promo-data" type="application/json">{"conceptIds": {}}</script>' +
						'<div class="event-promo js-event-promo" ></div>'
					}
				].forEach(({desc, dom}) => {
					test(`should throw error ${desc}`, async () => {
						const eventContainer = document.querySelector('.event-promo-container');
						eventContainer.innerHTML = dom;

						let hasError = false;
						try {
							await eventPromoInit(document, uuid);
						} catch (err) {
							hasError = true;
							expect(err.message).toEqual('no valid concept ids for eventpromo');
						}
						expect(hasError).toEqual(true);
					});
				});
			});
			test('should throw error when api call fails', async () => {
				const uuid = '000';
				const eventContainer = document.querySelector('.event-promo-container');
				eventContainer.innerHTML = eventPromoDataEl;
				let hasError = false;
				try {
					await eventPromoInit(document, uuid);
				} catch (err) {
					hasError = true;
					expect(err.message).toEqual('failed to fetch eventpromos');
				}
				expect(hasError).toEqual(true);
			});
			test('should throw error when api call returns no event', async () => {
				const uuid = '000';
				fetchMock.post(config.apiPath, {});
				const eventContainer = document.querySelector('.event-promo-container');
				eventContainer.innerHTML = eventPromoDataEl;
				let hasError = false;
				try {
					await eventPromoInit(document, uuid);
				} catch (err) {
					hasError = true;
					expect(err.message).toEqual('no eventpromo match for this event');
				}
				expect(hasError).toEqual(true);
			});
		});

		describe('success', () => {


			describe('by user topic', () => {
				const uuid = '000';
				test('should update dom', async () => {
					fetchMock.post(config.apiPath, liveEvent);
					const eventSource = liveEvent.eventpromo;
					const eventContainer = document.querySelector('.event-promo-container');
					eventContainer.innerHTML = eventPromoDataElNoData;

					await eventPromoInit(document, uuid);

					const injectedPromo = document.querySelector('.event-promo');

					const expectedUrl = new URL(eventSource.eventUrl);
					expectedUrl.searchParams.set('segmentId', eventSource.segmentId);

					expect(injectedPromo).toBeTruthy();
				});
				test('should return true', async () => {
					const eventContainer = document.querySelector('.event-promo-container');

					fetchMock.post(config.apiPath, liveEvent);
					eventContainer.innerHTML = eventPromoDataElNoData;

					expect(await eventPromoInit(document, uuid)).toEqual(true);
				});
			});

			describe('fall back to article concepts', () => {
				test('should update dom', async () => {
					fetchMock.post(config.apiPath, liveEvent);
					const eventSource = liveEvent.eventpromo;
					const eventContainer = document.querySelector('.event-promo-container');
					eventContainer.innerHTML = eventPromoDataEl;

					await eventPromoInit(document);

					const injectedPromo = document.querySelector('.event-promo');

					const expectedUrl = new URL(eventSource.eventUrl);
					expectedUrl.searchParams.set('segmentId', eventSource.segmentId);

					expect(injectedPromo).toBeTruthy();
				});
				test('should return true', async () => {
					const eventContainer = document.querySelector('.event-promo-container');

					fetchMock.post(config.apiPath, liveEvent);
					eventContainer.innerHTML = eventPromoDataEl;

					expect(await eventPromoInit(document)).toEqual(true);
				});
			});
		});
	});
});
