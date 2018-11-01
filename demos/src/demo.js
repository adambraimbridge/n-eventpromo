const {eventPromoInit} = require('../../src/index.js');

async function init () {
	if (!document.querySelector('.event-promo')) {
		throw new Error('.event-promo not found');
	}

	try {
		await eventPromoInit(document);
	}
	catch (err) {
		throw new Error(`failed to initialise eventpromo, ${err.toString()}`);
	}
}

init();
