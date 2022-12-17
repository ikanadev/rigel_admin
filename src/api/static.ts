import { YearData } from 'src/models/composed';

import { staticKeys } from './staticKeys';
import { useQuery } from '@tanstack/react-query';
import { ky } from './ky';

export const useYears = () =>
	useQuery({
		queryKey: staticKeys.list(),
		queryFn: async (): Promise<YearData[]> => {
			const resp = ky.get('years');
			return resp.json();
		},
	});
