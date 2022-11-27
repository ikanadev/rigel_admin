import { HTTPError } from 'ky';

export const setErrMsg = (err: unknown, setter: (msg: string) => void) => {
	if (err instanceof HTTPError && err.response) {
		err.response
			.json()
			.then((body: { message?: string }) => {
				if (typeof body?.message === 'string') {
					setter(body.message);
					return;
				}
				setter('Unknown error!');
			})
			.catch(() => {
				setter('Unknown error!');
			});
		return;
	}
	setter('Unknown error!');
};
