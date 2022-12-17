import { Title, Table, Skeleton, Alert, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { Icon } from '@iconify-icon/react';

import { useNavigate } from 'react-router-dom';
import { useTeachers } from 'src/api/teacher';
import { routes } from 'src/routes/routes';

const Teachers = () => {
	const navigate = useNavigate();
	const teachers = useTeachers();
	const [search, setSearch] = useState('');

	const onChangeSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(ev.currentTarget.value);
	};

	const handleRowClick = (
		ev: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
	) => {
		const id = ev.currentTarget.dataset.id;
		if (!id) return;
		navigate(routes.teacher(id));
	};
	const handleRowKeyDown = (ev: React.KeyboardEvent<HTMLTableRowElement>) => {
		if (ev.code === 'Enter' || ev.code === 'Space') {
			const id = ev.currentTarget.dataset.id;
			if (!id) return;
			navigate(routes.teacher(id));
		}
	};

	const filteredTeachers = !teachers.data
		? []
		: teachers.data.filter((teacher) => {
				const term = search.trim().toLocaleLowerCase();
				if (!search || search.length <= 2) return true;
				if (
					teacher.name.toLocaleLowerCase().indexOf(term) >= 0 ||
					teacher.last_name.toLocaleLowerCase().indexOf(term) >= 0 ||
					teacher.email.toLocaleLowerCase().indexOf(term) >= 0
				) {
					return true;
				}
				return false;
		  });

	return (
		<>
			<Title order={1}>Teachers</Title>
			{teachers.isLoading && <Loading />}
			{teachers.error && (
				<Alert title="Error" color="red">
					Can't load teachers
				</Alert>
			)}
			<TextInput
				value={search}
				onChange={onChangeSearch}
				icon={<Icon icon="mdi:magnify" width={24} />}
				my="sm"
				placeholder="Buscar..."
			/>
			{teachers.data && (
				<Table verticalSpacing={4} highlightOnHover>
					<thead>
						<tr>
							<th>Name(s)</th>
							<th>LastName(s)</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
						{filteredTeachers.map((teacher) => (
							<tr
								key={teacher.id}
								data-id={teacher.id}
								style={{ cursor: 'pointer' }}
								onClick={handleRowClick}
								onKeyDown={handleRowKeyDown}
								tabIndex={0}
							>
								<td>{teacher.name}</td>
								<td>{teacher.last_name}</td>
								<td>{teacher.email}</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

const Loading = () => (
	<>
		<Skeleton h={20} radius="md" my={6} />
		<Skeleton h={20} radius="md" my={6} />
		<Skeleton h={20} radius="md" my={6} />
		<Skeleton h={20} radius="md" my={6} />
		<Skeleton h={20} radius="md" my={6} />
		<Skeleton h={20} radius="md" my={6} />
		<Skeleton h={20} radius="md" my={6} />
		<Skeleton h={20} radius="md" my={6} />
		<Skeleton h={20} radius="md" my={6} />
		<Skeleton h={20} radius="md" my={6} />
	</>
);

export default Teachers;
