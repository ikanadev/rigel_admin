import { FC } from 'react';
import { Subscription } from 'src/models';
import { Title } from '@mantine/core';
import SubscriptionForm from './SubscriptionForm';
import SubscriptionsTable from './SubscriptionsTable';

type Props = {
	subscriptions: Subscription[];
};
const Subscriptions: FC<Props> = ({ subscriptions }) => {
	console.log(subscriptions);
	return (
		<>
			<Title mt="md" order={3}>
				Subscriptions
			</Title>
			<SubscriptionForm subscriptions={subscriptions} />
			<SubscriptionsTable subscriptions={subscriptions} />
		</>
	);
};

export default Subscriptions;
