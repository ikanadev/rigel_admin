import kyLib from 'ky';
// import { useAdminState } from 'src/store/admin';
import { API_URL } from 'src/utils/constants';

export const ky = kyLib.extend({
  prefixUrl: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (req) => {
        // const tokenStr = useAdminState.getState().token;
        if (true) {
          req.headers.set('Authorization', '');
        }
      },
    ],
  },
});
