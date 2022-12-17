const teacherKeys = {
	name: ['teacher'] as const, // never use it from outside
	list: () => [...teacherKeys.name, 'list'] as const,
	detail: (id: string) => [...teacherKeys.name, 'detail', id] as const,
};

export { teacherKeys };
