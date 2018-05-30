async function getEventsFromApi (eventConcepts = []) {
	const url = '/eventpromo/api/';

	let fetchResponse;
	try {
		fetchResponse = await fetch(url, {
			body: JSON.stringify(eventConcepts),
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
		const eventPromos = await fetchResponse.json();
		return eventPromos;
	}
	catch (err) {
		throw new Error('failed to parse response from enventpromo-api');
	}
}

module.exports = {
	getEventsFromApi
};
