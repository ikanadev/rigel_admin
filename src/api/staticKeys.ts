const staticKeys = {
	name: ['static'] as const, // never use it from outside
	list: () => [...staticKeys.name, 'list'] as const,
};

export { staticKeys };
