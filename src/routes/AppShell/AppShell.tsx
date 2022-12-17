import { Navigate, Outlet } from 'react-router-dom';
import { Container, Flex, Box } from '@mantine/core';
import Navbar from './Navbar';

import { useAdminState } from 'src/store/admin';
import { routes } from 'src/routes/routes';

const AppShell = () => {
	const admin = useAdminState((state) => state.admin);

	if (admin === null) {
		return <Navigate to={routes.login()} />;
	}
	return (
		<>
			<Container>
				<Flex
					my={20}
					mih="calc(100vh - 40px)"
					sx={{
						borderRadius: 20,
						overflow: 'hidden',
						boxShadow: '2px 2px 10px 2px #00000022',
					}}
				>
					<Box bg="#fafafa" sx={{ borderRight: '1px solid #dedede' }} w={250}>
						<Navbar />
					</Box>
					<Box sx={{ flex: 1 }} p="lg" bg="#fff">
						<Outlet />
					</Box>
				</Flex>
			</Container>
		</>
	);
};

export default AppShell;
