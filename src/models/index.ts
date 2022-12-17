export type Teacher = {
	id: string;
	name: string;
	last_name: string;
	email: string;
	is_admin: boolean;
};

export type Subscription = {
	id: string;
	method: string;
	qtty: string;
	date: number;
};

export type Period = {
	id: string;
	name: string;
};

export type Area = {
	id: string;
	name: string;
	points: number;
};

export type Year = {
	id: string;
	value: number;
};
