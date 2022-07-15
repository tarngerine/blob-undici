import type { RequestHandler } from '@sveltejs/kit';

export const patch: RequestHandler = async ({ request }) => {
	console.log(request.body);
	return {
		status: 200,
		body: request.body
	};
};
