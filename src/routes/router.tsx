import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

import Home from './Home';
import Login from './Login';

const router = createBrowserRouter([
  { path: routes.home(), element: <Home /> },
  { path: routes.login(), element: <Login /> },
]);

export default router;
