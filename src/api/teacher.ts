import { Teacher, Subscription } from 'src/models';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

type TeacherRes = Teacher & { subscriptions: Subscription[] };
export const useTeacher = (id: string | undefined) =>
	useQuery({
		enabled: !!id,
		queryKey: teacherKeys.detail(id ?? ''),
		queryFn: async (): Promise<TeacherRes> => {
			const resp = await ky.get(`admin/teacher/${id}`);
			return await resp.json();
		},
	});

type AddSubsReq = {
	teacher_id: string;
	year_id: string;
	method: string;
	qtty: number;
};
export const useAddSubscription = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: AddSubsReq) => {
			await ky.post('admin/subscription', { json: data });
		},
		onSuccess: (_, req) => {
			queryClient.invalidateQueries(teacherKeys.detail(req.teacher_id));
		},
	});
};

type DeleteSubsReq = {
	teacher_id: string;
	subs_id: string;
};
export const useDeleteSubscription = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: DeleteSubsReq) => {
			await ky.delete(`admin/subscription/${data.subs_id}`);
		},
		onSuccess: (_, req) => {
			queryClient.invalidateQueries(teacherKeys.detail(req.teacher_id));
		},
	});
};
