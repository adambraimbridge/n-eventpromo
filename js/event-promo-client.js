async function getEventsFromApi (eventConcepts = []) {
	const url = '/eventpromo/api/';

	try {
		const httpResult = await fetch(url, {
			body: JSON.stringify(eventConcepts),
			headers: {
				'accept': 'application/json',
				'content-type': 'application/json'
			},
			method: 'POST'
		});

		const events = await httpResult.json();
		// console.log('**fetching data for concepts**', JSON.stringify(eventConcepts, null, 2));
		// console.log('**api endpoint**', url);
		// console.log('**fetch events**', events);

		return events;
	}
	catch(error) {
		throw error;
	}
}

module.exports = {
	getEventsFromApi
};
