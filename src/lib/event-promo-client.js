const config = require('../config');

async function getEventsFromApi (eventConcepts = [], uuid = '') {
	const bodyParams = Object.assign({}, eventConcepts, uuid );
	let fetchResponse;
	try {
		fetchResponse = await fetch(config.apiPath, {
			body: JSON.stringify(bodyParams),
			headers: {
				'accept': 'application/json',
				'content-type': 'application/json'
			},
			method: 'POST'
		});
	}
	catch (err) {
		throw new Error('failed to fetch eventpromos from enventpromo-api');
	}

	try {
		const jsonResponse = await fetchResponse.json();
		return jsonResponse;
	}
	catch (err) {
		throw new Error('failed to parse response from enventpromo-api');
	}
}

module.exports = {
	getEventsFromApi
};
