import { Alert, AlertProps } from '@mantine/core';
import React, { useState, useCallback } from 'react';

export const useAlertMsg = (initial: string) => {
	const [msg, setMsg] = useState(initial);
	const close = useCallback(() => setMsg(''), []);
	return {
		show: Boolean(msg),
    msg,
		setMsg,
		close,
	};
};

interface Props extends AlertProps {
	show: boolean;
}
const AlertMsg: React.FC<Props> = ({ show, ...rest }) => {
	if (!show) {
		return null;
	}
	return <Alert {...rest} />;
};

export default AlertMsg;
