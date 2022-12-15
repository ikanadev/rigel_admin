import { Flex, Text } from '@mantine/core';
import NavItem from './NavItem';

import { useAdminState } from 'src/store/admin';
import { routes } from 'src/routes/routes';

const navItems = [
	{ text: 'Home', path: routes.home(), iconName: 'mdi:home-variant' },
	{
		text: 'Teachers',
		path: routes.teachers(),
		iconName: 'mdi:account-multiple',
	},
];

const Navbar = () => {
	const admin = useAdminState((state) => state.admin)!;
	return (
		<>
			<Flex my="lg" mx="sm" direction="column">
				<Text weight={600} size={16} align="center">
					{`${admin.name} ${admin.last_name}`}
				</Text>
				<Text align="center" size={14}>
					Admin dashboard
				</Text>
			</Flex>
			<Flex direction="column">
				{navItems.map(({ text, path, iconName }) => (
					<NavItem key={path} text={text} path={path} iconName={iconName} />
				))}
			</Flex>
		</>
	);
};

export default Navbar;
