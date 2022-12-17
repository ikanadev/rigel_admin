import { Year, Period, Area } from '.';

export type YearData = Year & {
	periods: Period[];
	areas: Area[];
};
