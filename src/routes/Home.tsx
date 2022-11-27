import { useAdminState } from 'src/store/admin';
import { routes } from 'src/routes/routes';

import { Navigate } from 'react-router-dom';

const Home = () => {
	const admin = useAdminState((state) => state.admin);

	if (admin === null) {
		return <Navigate to={routes.login()} />;
	}
	return <div>Home</div>;
};

export default Home;
