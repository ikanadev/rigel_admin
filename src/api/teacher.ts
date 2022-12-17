import { Teacher } from 'src/models';

import { useQuery } from '@tanstack/react-query';
import { teacherKeys } from './teacherKeys';
import { ky } from './ky';

export const useTeachers = () =>
	useQuery({
		queryKey: teacherKeys.list(),
		queryFn: async (): Promise<Teacher[]> => {
			const resp = await ky.get('admin/teachers');
			return await resp.json();
		},
	});
