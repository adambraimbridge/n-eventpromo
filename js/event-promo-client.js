module.exports = (eventConcepts) => {

	const url = '/eventpromo/api/';
	const headers = new Headers();

	headers.append('Content-Type', 'application/json');

	return fetch(url, {
		// need cookie to get personalised or ab-tested responses
		method: 'POST',
		body: JSON.stringify(eventConcepts),
		headers
	} )
		.then(res => res.json())
		.then(promoEvents => {
			return promoEvents.eventpromos[0];
		})
		.catch(error => {
			throw error;
		});
};
