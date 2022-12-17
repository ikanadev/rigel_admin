import React, { FC } from 'react';
import { Table, Flex, ActionIcon, Text } from '@mantine/core';
import { Icon } from '@iconify-icon/react';
import { Subscription } from 'src/models';

import dayjs from 'dayjs';

type Props = {
	subscriptions: Subscription[];
	handleDeleteSubs: (id: string) => void;
};
const SubscriptionsTable: FC<Props> = ({ subscriptions, handleDeleteSubs }) => {
	const handleDelete = (
		ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		const id = ev.currentTarget.dataset.subid;
		if (!id) return;
		handleDeleteSubs(id);
	};

	if (subscriptions.length === 0)
		return (
			<Text fs="italic" ta="center" color="gray" my="sm">
				Teacher has no subscriptions.
			</Text>
		);
	return (
		<Table>
			<thead>
				<tr>
					<th>Date:</th>
					<th>Year:</th>
					<th>Method:</th>
					<th>Price:</th>
					<th>Actions:</th>
				</tr>
			</thead>
			<tbody>
				{subscriptions.map((sub) => (
					<tr key={sub.id}>
						<td>{dayjs(sub.date).format('MMM DD')}</td>
						<td>{dayjs(sub.date).format('YYYY')}</td>
						<td>{sub.method}</td>
						<td>{sub.qtty}</td>
						<td>
							<Flex gap={4}>
								<ActionIcon color="blue" variant="light" aria-label="Edit">
									<Icon icon="mdi:pencil" width={20} />
								</ActionIcon>
								<ActionIcon
									color="red"
									variant="light"
									aria-label="Delete"
									data-subid={sub.id}
									onClick={handleDelete}
								>
									<Icon icon="mdi:delete" width={20} />
								</ActionIcon>
							</Flex>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default SubscriptionsTable;
