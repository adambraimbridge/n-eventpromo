const url = '/eventpromo/api/';

// async function getEventsFromApi (eventConcepts = []) {
// 	const url = '/eventpromo/api/';

// 	try {
// 		const httpResult = await fetch(url, {
// 			body: JSON.stringify(eventConcepts),
// 			headers: {
// 				'accept': 'application/json',
// 				'content-type': 'application/json'
// 			},
// 			method: 'POST'
// 		});

// 		return await httpResult.json();
// 	}
// 	catch(error) {
// 		throw error;
// 	}
// }

function getEventsFromApi (eventConcepts = []) {
	const url = '/eventpromo/api/';

	return fetch(url, {
		body: JSON.stringify(eventConcepts),
		headers: {
			'accept': 'application/json',
			'content-type': 'application/json'
		},
		method: 'POST'
	})
	.then((eventPromos) => eventPromos.json())
	.catch(err => {
		throw err;
	});
}

module.exports = {
	getEventsFromApi
};
