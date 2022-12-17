import { FC, useState } from 'react';
import { Subscription } from 'src/models';
import { Title, Modal, Flex, Button } from '@mantine/core';
import SubscriptionForm from './SubscriptionForm';
import SubscriptionsTable from './SubscriptionsTable';

import { useParams } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useDeleteSubscription } from 'src/api/teacher';

type Props = {
	subscriptions: Subscription[];
};
const Subscriptions: FC<Props> = ({ subscriptions }) => {
	const { id } = useParams();
	const deleteSubscription = useDeleteSubscription();
	const [subsId, setSubsId] = useState<string | null>(null);
	const [isOpenDelete, deleteModal] = useDisclosure(false);

	const handleDeleteSubs = (subsId: string) => {
		setSubsId(subsId);
		deleteModal.open();
	};
	const closeDeleteModal = () => {
		setSubsId(null);
		deleteModal.close();
	};
	const confirmDeleteSubs = () => {
		if (!(id && subsId)) return;
		deleteSubscription.mutate(
			{ teacher_id: id, subs_id: subsId },
			{
				onSuccess: () => {
					closeDeleteModal();
				},
			},
		);
	};

	return (
		<>
			<Title mt="md" order={3}>
				Subscriptions
			</Title>
			<SubscriptionForm subscriptions={subscriptions} />
			<SubscriptionsTable
				subscriptions={subscriptions}
				handleDeleteSubs={handleDeleteSubs}
			/>
			<Modal
				opened={isOpenDelete}
				onClose={closeDeleteModal}
				title="Delete subscription?"
			>
				<Flex justify="end">
					<Button
						color="red"
						onClick={confirmDeleteSubs}
						loading={deleteSubscription.isLoading}
					>
						Yes
					</Button>
				</Flex>
			</Modal>
		</>
	);
};

export default Subscriptions;
