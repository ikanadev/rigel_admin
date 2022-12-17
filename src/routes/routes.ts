export const routes = {
	root: () => '/',
	login: () => '/login',
	teachers: () => '/teachers',
	teacher: (id: string) => `/teachers/${id}`,
	home: () => '/home',
};
