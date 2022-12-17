const teacherKeys = {
	name: ['teacher'] as const, // never use it from outside
	list: () => [...teacherKeys.name, 'list'] as const,
};

export { teacherKeys };
