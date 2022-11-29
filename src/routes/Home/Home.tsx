import { Navigate } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import Header from './Header';
import Navbar from './Navbar';

import { useAdminState } from 'src/store/admin';
import { routes } from 'src/routes/routes';

const Home = () => {
	const admin = useAdminState((state) => state.admin);

	if (admin === null) {
		return <Navigate to={routes.login()} />;
	}
	return (
		<AppShell header={<Header />} navbar={<Navbar />}>
			<div>Content</div>
		</AppShell>
	);
};

export default Home;
