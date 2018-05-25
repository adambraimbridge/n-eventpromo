//const queryString = require('query-string');


module.exports = (eventConcepts)   => {

	const url = '/eventpromo/api/';
    const headers = new Headers();
    let theEvent;

    console.log(eventConcepts);

	headers.append('Content-Type', 'application/json');

	return fetch(url, {
		// need cookie to get personalised or ab-tested responses
		method: 'POST',
		body: JSON.stringify(eventConcepts),
		headers
	} )
		.then(res => res.json())
		.then(promoEvents => {
            console.log(promoEvents);
            return promoEvents.eventpromos[0];
        })
		.catch(error => {
			throw error;
		});
};
