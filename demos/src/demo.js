const {eventPromoInit} = require('../../src/index.js');
//TODO spoof a uuid?
const uuid = '00000000-0000-0000-0000-000000000000';
async function init () {
	if (!document.querySelector('.event-promo')) {
		throw new Error('.event-promo not found');
	}

	try {
		await eventPromoInit(document, uuid);
	}
	catch (err) {
		throw new Error(`failed to initialise eventpromo, ${err.toString()}`);
	}
}

init();
