import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';
import { NavLink as MantineLink } from '@mantine/core';

interface Props {
	text: string;
	path: string;
	iconName: string;
}
const NavItem: FC<Props> = ({ text, path, iconName }) => {
	return (
		<NavLink to={path} style={{ textDecoration: 'none' }}>
			{({ isActive }) => (
				<MantineLink
					component="div"
					label={text}
					active={isActive}
					icon={<Icon icon={iconName} />}
					sx={{ fontWeight: 500 }}
				/>
			)}
		</NavLink>
	);
};
export default NavItem;
