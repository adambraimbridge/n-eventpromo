'use strict';
const chai = require('chai');
const { JSDOM } = require('jsdom');
//const sinon = require('sinon');
const sinonChai = require('sinon-chai');

//const expect = chai.expect;
chai.use(sinonChai);

describe('Unit tests: main', () => {

	beforeEach(() => {
		global.window = new JSDOM('<html data-content-id="ARTICLE-ID">' +
			'<head></head>' +
			'<body>' +
			'	<div class="native-ad__first"></div></section>' +
			'</body>' +
			'</html>').window;
		global.document = window.document;

	});

	afterEach(() => {
	});

	describe('eventPromoInit method', () => {
		describe('error cases', () => {
			describe('when dom missing', () => {
				it('should throw error when .js-even-promo-data missing', () => {

				});
				it('should throw error when .js-even-promo missing', () => {

				});
			});
			describe('when concepts are invalid', () => {
				it('should throw error when concepts are empty', () => {

				});
				it('should throw error when concepts keys are empty', () => {

				});
			});
			it('should throw error when api call fails', () => {

			});
			it('should throw error when api call returns no event', () => {

			});
		});
		describe('success', () => {
			it('should update dom', () => {

			});
			it('should return true', () => {

			});
		});
	});
});
