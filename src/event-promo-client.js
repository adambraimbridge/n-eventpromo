async function getEventsFromApi (eventConcepts = []) {
	const url = '/eventpromo/api/';

	try {
		const fetchResponse = await fetch(url, {
			body: JSON.stringify(eventConcepts),
			headers: {
				'accept': 'application/json',
				'content-type': 'application/json'
			},
			method: 'POST'
		});

		const eventPromos = await fetchResponse.json();

		return eventPromos;
	}
	catch (err) {
		throw err;
	}
}

module.exports = {
	getEventsFromApi
};
