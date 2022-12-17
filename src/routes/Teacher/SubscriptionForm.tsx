import { FC } from 'react';
import { Flex, Button, Select, TextInput } from '@mantine/core';
import { Icon } from '@iconify-icon/react';
import { Subscription } from 'src/models';

import { useParams } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { useYears } from 'src/api/static';
import { useAddSubscription } from 'src/api/teacher';

const paymentMethods = ['Tigo Money', 'Deposito Bancario', 'Cortesía', 'Otro'];

type FormData = {
	amount: string;
	year: string | null;
	method: string | null;
};

type Props = {
	subscriptions: Subscription[];
};
const SubscriptionForm: FC<Props> = ({ subscriptions }) => {
	const { id } = useParams();
	const years = useYears();
	const [showingForm, formActions] = useDisclosure(false);
	const addSubscription = useAddSubscription();
	const { register, handleSubmit, control } = useForm<FormData>({
		defaultValues: { amount: '150', year: null, method: null },
	});

	let yearOptions = !years.data
		? []
		: years.data.map((y) => ({ label: y.value.toString(), value: y.id }));
	yearOptions = yearOptions.filter(
		(yo) =>
			!subscriptions.some(
				(sb) => dayjs(sb.date).get('y').toString() === yo.label,
			),
	);

	const onSubmit = (data: FormData) => {
		if (!(id && data.year && data.method)) return;
		addSubscription.mutate(
			{
				teacher_id: id,
				year_id: data.year,
				method: data.method,
				qtty: parseInt(data.amount, 10),
			},
			{
				onSuccess: () => {
					formActions.close();
				},
			},
		);
	};

	if (yearOptions.length === 0) return null;
	return showingForm ? (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Flex direction="column" align="end" my="xs">
				<Flex gap={4} mb="xs">
					<Controller
						control={control}
						name="year"
						rules={{
							required: 'Select an option',
						}}
						render={({ field, fieldState }) => (
							<Select
								{...field}
								error={fieldState.error?.message}
								data={yearOptions}
								label="Year"
								placeholder="Pick one"
							/>
						)}
					/>
					<Controller
						control={control}
						name="method"
						rules={{ required: 'Select an option' }}
						render={({ field, fieldState }) => (
							<Select
								{...field}
								error={fieldState.error?.message}
								data={paymentMethods}
								label="Payment method"
								placeholder="Pick one"
							/>
						)}
					/>
					<TextInput
						{...register('amount')}
						type="number"
						label="Amout (Bs.)"
						placeholder="Ex. 150 Bs."
					/>
				</Flex>
				<Flex gap={4}>
					<Button onClick={formActions.close} color="gray">
						Cancel
					</Button>
					<Button
						type="submit"
						color="green"
						rightIcon={<Icon icon="mdi:plus" height={24} />}
						loading={addSubscription.isLoading}
					>
						Add
					</Button>
				</Flex>
			</Flex>
		</form>
	) : (
		<Flex justify="end">
			<Button
				onClick={formActions.open}
				color="green"
				rightIcon={<Icon icon="mdi:plus" height={24} />}
			>
				Add Subscription
			</Button>
		</Flex>
	);
};

export default SubscriptionForm;
