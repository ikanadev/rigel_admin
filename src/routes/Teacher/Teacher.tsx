import {
	Title,
	Avatar,
	Flex,
	Skeleton,
	Alert,
	Text,
	Badge,
} from '@mantine/core';

import { useParams } from 'react-router-dom';
import { useTeacher } from 'src/api/teacher';

const Teacher = () => {
	const { id } = useParams();
	const teacher = useTeacher(id);
	return (
		<>
			<Title order={1}>Teacher</Title>
			{teacher.isLoading && <TeacherSkeleton />}
			{teacher.error && (
				<Alert title="Error" color="red">
					Can't load teacher
				</Alert>
			)}
			{teacher.data && (
				<>
					<Flex mt="md" align="center">
						<Avatar radius="xl" color="blue" size="lg">
							{`${teacher.data.name[0]}${teacher.data.last_name[0]}`}
						</Avatar>
						<Flex direction="column" ml="sm">
							<Text fw={500} lh={1}>
								{teacher.data.name} {teacher.data.last_name}
							</Text>
							<Text fs="italic">{teacher.data.email}</Text>
						</Flex>
					</Flex>
					<Flex mt="sm" align="center">
						<Text size="md" mr="sm">
							Account type:{' '}
						</Text>
						<Badge color={teacher.data.is_admin ? 'blue' : 'teal'}>
							{teacher.data.is_admin ? 'Admin' : 'Regular'}
						</Badge>
					</Flex>
				</>
			)}
		</>
	);
};

const TeacherSkeleton = () => (
	<>
		<Flex align="center" mt="lg">
			<Skeleton w={58} h={58} radius={29} />
			<Flex direction="column" ml="sm">
				<Skeleton w={200} h={20} radius={6} mb={10} />
				<Skeleton w={200} h={16} radius={6} />
			</Flex>
		</Flex>
		<Flex mt="md" direction="column">
			<Skeleton h={20} mb={10} />
			<Skeleton h={20} mb={10} />
			<Skeleton h={20} mb={10} />
			<Skeleton h={20} mb={10} />
		</Flex>
	</>
);

export default Teacher;
