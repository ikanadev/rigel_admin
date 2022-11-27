import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import router from './routes/router';

const queryClient = new QueryClient();

function App() {
	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</MantineProvider>
	);
}
export default App;
