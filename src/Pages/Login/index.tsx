import { isAxiosError } from 'axios';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Assets/Logo.svg';
import { api } from '../../Services/axios';
import { removerFormatacaoDocumento } from '../../Utils/removerFormatacaoDocumento';
import {
	ACCESS_TOKEN_KEY,
	NOME_USUARIO_KEY,
	PERFIL_USUARIO_KEY,
} from '../../Utils/sessionStorageKeys';

interface FormLogin {
	login: string;
	senha: string;
}

export const LoginPage = () => {
	const navigate = useNavigate();

	const toast = useRef<any>();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormLogin>();

	const onSubmit = async ({ login, senha }: FormLogin) => {
		try {
			const { data } = await api.post('/auth', {
				login: removerFormatacaoDocumento(login),
				senha,
			});

			api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

			sessionStorage.setItem(ACCESS_TOKEN_KEY, data.token);
			sessionStorage.setItem(NOME_USUARIO_KEY, data.nomeUsuario);
			sessionStorage.setItem(PERFIL_USUARIO_KEY, data.perfilUsuario);

			navigate('/main');
		} catch (error) {
			const isAppError = isAxiosError(error);
			const message =
				isAppError && error.response?.status === 401
					? 'Usuário ou senha inválidos'
					: 'Falha ao realizar login. Tente novamente em instantes';

			toast.current?.show({
				severity: 'error',
				summary: 'Atenção',
				detail: message,
			});
		}
	};

	return (
		<div className="h-screen flex justify-content-center align-items-center">
			<Toast ref={toast} />

			<Card style={{ width: '300px', maxWidth: '80vw' }}>
				<div className="flex justify-content-center pb-4">
					<img src={Logo} alt="" />
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex-col">
						<InputMask
							className="mb-2 w-12"
							type="cpf"
							id="cpf"
							placeholder="CPF"
							mask="999.999.999-99"
							maxLength={11}
							{...register('login', {
								required: true,
								minLength: 11,
							})}
							autoClear={false}
						/>

						<div>
							{errors.login && (
								<span className="p-error">Campo obrigatório!</span>
							)}
						</div>
					</div>

					<div>
						<InputText
							type="password"
							className="mb-2 w-12"
							placeholder="Senha"
							id="password"
							{...register('senha', { required: true })}
						/>

						{errors.senha && (
							<div>
								<span className="p-error">Campo obrigatório</span>
							</div>
						)}
					</div>

					<div className="flex justify-content-center">
						<Button
							label="Entrar"
							type="submit"
							className="my-4"
							severity="success"
							rounded
							loading={isSubmitting}
						/>
					</div>
				</form>
			</Card>
		</div>
	);
};
