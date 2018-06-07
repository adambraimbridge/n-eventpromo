const { promoInit } = require('../../main');

async function init () {
	if (!document.querySelector('.event-promo')) {
		throw new Error('.event-promo not found');
	}

	try {
		await promoInit(document);
	}
	catch (err) {
		throw new Error('failed to initialise eventpromo');
	}
}

init ();
