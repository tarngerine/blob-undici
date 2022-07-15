import type { RequestHandler } from '@sveltejs/kit';
import { FormData, formDataToBlob } from 'formdata-polyfill/esm.min';
export const patch: RequestHandler = async ({ request }) => {
	const form = await request.formData();

	// We create a new FormData to
	// A) separate the form input "file" data from the other form input "text",
	//     which will go to another API call
	const formWithImage = new FormData();
	formWithImage.append('file', form.get('file')!);
	// B) to convert the FormData to a Blob to get content-type boundary to pass as header, which the API expects
	//    not sure how else to get the boundary
	const blob = formDataToBlob(formWithImage);
	const contentTypeWithBoundary = blob.type;

	const response = await fetch('/api/file', {
		method: 'PATCH',
		headers: {
			contentType: contentTypeWithBoundary,
			...request.headers
		},
		body: blob
	});

	if (response.ok) {
		return {
			status: response.status,
			body: await response.json()
		};
	}

	return {
		status: response.status,
		body: await response.text()
	};
};
