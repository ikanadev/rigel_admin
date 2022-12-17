import {
	Container,
	Center,
	Card,
	Image,
	TextInput,
	Flex,
	ActionIcon,
	Button,
} from '@mantine/core';
import { Icon } from '@iconify-icon/react';
import AlertMsg, { useAlertMsg } from 'src/components/AlertMsg';

import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAdminState } from 'src/store/admin';
import { EMAIL_REGEX } from 'src/utils/constants';
import { setErrMsg } from 'src/utils/functions';
import { routes } from 'src/routes/routes';
import { useLogin } from 'src/api/auth';

interface FormData {
	email: string;
	password: string;
}
const Login = () => {
	const login = useLogin();
	const navigate = useNavigate();
	const [showPass, { toggle: toggleShowPass }] = useDisclosure(false);
	const errAlert = useAlertMsg('');
	const { setAdmin, setToken } = useAdminState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: { email: 'kevin@gmail.com', password: '123456' },
	});

	const onSubmit = handleSubmit((data) => {
		login.mutate(data, {
			onSuccess(resp) {
				if (!resp.teacher.is_admin) {
					errAlert.setMsg('Usuario sin permisos de administrador');
					return;
				}
				setAdmin(resp.teacher);
				setToken(resp.jwt);
				navigate(routes.home());
			},
			onError(err) {
				setErrMsg(err, errAlert.setMsg);
			},
		});
	});

	return (
		<Container>
			<Center mih="100vh" w="100%" pos="relative">
				<Card shadow="lg" p="md" w="100%" maw={350}>
					<Flex justify="center" mb="sm">
						<Image
							src="logo.png"
							height={90}
							width="auto"
							alt="logo"
							display="block"
						/>
					</Flex>
					<AlertMsg
						show={errAlert.show}
						onClose={errAlert.close}
						color="orange"
						title="Ups!"
						py="md"
						withCloseButton
					>
						{errAlert.msg}
					</AlertMsg>
					<form onSubmit={onSubmit}>
						<Flex direction="column" gap="sm">
							<TextInput
								{...register('email', {
									required: 'Email is required',
									pattern: { value: EMAIL_REGEX, message: 'Not valid email' },
								})}
								error={errors.email?.message}
								placeholder="Email"
								label="Email"
								autoComplete="off"
								withAsterisk
								icon={<Icon icon="mdi:email" width={20} />}
							/>
							<TextInput
								{...register('password', { required: 'Password is required' })}
								error={errors.password?.message}
								placeholder="Password"
								label="Password"
								type={showPass ? 'text' : 'password'}
								icon={<Icon icon="mdi:key-variant" width={20} />}
								withAsterisk
								rightSection={
									<ActionIcon onClick={toggleShowPass}>
										<Icon
											icon={showPass ? 'mdi:eye-off' : 'mdi:eye'}
											width={20}
										/>
									</ActionIcon>
								}
							/>
							<Button type="submit">Login</Button>
						</Flex>
					</form>
				</Card>
			</Center>
		</Container>
	);
};

export default Login;
