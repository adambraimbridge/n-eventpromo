//const subject = require('../src/main');

describe('Unit tests: main', () => {

	beforeEach(() => {
	});

	afterEach(() => {
	});

	describe('eventPromoInit method', () => {
		describe('error cases', () => {
			describe('when dom missing', () => {
				test('should throw error when .js-even-promo-data missing', () => {

				});
				test('should throw error when .js-even-promo missing', () => {

				});
			});
			describe('when concepts are invalid', () => {
				test('should throw error when concepts are empty', () => {

				});
				test('should throw error when concepts keys are empty', () => {

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
