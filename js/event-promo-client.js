//const queryString = require('query-string');

//use to flesh out until we have our next-eventpromo-api up and running.
//dummy array of topics
//const indexOfEventTopics = ['00000000-0000-0000-0000-000000000000'];
module.exports = function (eventConcepts) {
	console.log(eventConcepts);

	const url = '/eventpromo/api/';
	const headers = new Headers();

	headers.append('Content-Type', 'application/json');

	return fetch(url, {
		// need cookie to get personalised or ab-tested responses
		method: 'POST',
		body: eventConcepts,
		headers
	} )
		.then(res => res.json())
		.then(theEvent => theEvent)
		.catch(error => {
			throw error;
		});
};
