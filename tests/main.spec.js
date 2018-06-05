const eventPromoInit = require('../src/main');
const conceptFixture = require('./fixtures/conceptFixture.json');
const {JSDOM} = require('jsdom');
const $ = require('cheerio')
const eventPromo = 	`<script class="js-event-promo-data" type="application/json">${conceptFixture}</script>
<div class="event-promo js-event-promo" ></div>`;
const noEventPromo = '<div></div>';
let dom;
let doc;

describe('Unit tests: main', () => {

	beforeEach(() => {
		dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>');
		doc = dom.window.document;
	});

	afterEach(() => {
		dom = '';
	});

	describe('eventPromoInit method', () => {

		describe('error cases', () => {

			describe('when dom missing', () => {
				test('should throw error when .js-even-promo-data missing', async () => {
					doc.innerHTML = noEventPromo;
					const subject = await eventPromoInit();
					console.log(subject);
					expect(subject).toThrow;
				});
				test('should throw error when .js-even-promo missing', () => {
					//expect(subject()).toThrow;
				});
			});
			describe('when concepts are invalid', () => {

				test('should throw error when concepts are empty', () => {
					doc.innerHTML = noEventPromo;
					//expect(subject()).toThrow;
				});
				test('should throw error when concepts keys are empty', () => {
					doc.innerHTML = noEventPromo;
					//expect(subject()).toThrow;
				});
			});
			test('should throw error when api call fails', () => {

			});
			test('should throw error when api call returns no event', () => {

			});
		});
		describe('success', () => {

			test('should update dom', () => {

			});
			test('should return true', () => {

			});
		});
	});
});
