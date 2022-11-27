import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { Admin } from '../models';

interface AdminState {
	admin: Admin | null;
	token: string;
}
interface AdminActions {
	setAdmin: (admin: Admin) => void;
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
