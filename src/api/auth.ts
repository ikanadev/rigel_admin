import { Teacher } from 'src/models';

import { useMutation } from '@tanstack/react-query';
import { ky } from './ky';

type LoginReq = {
	email: string;
	password: string;
};
type LoginRes = {
	teacher: Teacher;
	jwt: string;
};
export const useLogin = () =>
	useMutation({
		mutationFn: async (data: LoginReq): Promise<LoginRes> => {
			const resp = await ky.post('signin', { json: data });
			return await resp.json();
		},
	});
