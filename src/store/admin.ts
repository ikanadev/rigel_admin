import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { Teacher } from '../models';

interface AdminState {
	admin: Teacher | null;
	token: string;
}
interface AdminActions {
	setAdmin: (admin: Teacher) => void;
	setToken: (token: string) => void;
}

export const useAdminState = create(
	devtools(
		immer<AdminState & AdminActions>((set) => ({
			admin: null,
			token: '',
			setAdmin(admin) {
				set((state) => {
					state.admin = admin;
				});
			},
			setToken(token) {
				set((state) => {
					state.token = token;
				});
			},
		})),
	),
);
