import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useObterIniciais } from '../../../Utils/hooks/useObterIniciais';
import {
	NOME_USUARIO_KEY,
	PERFIL_USUARIO_KEY,
} from '../../../Utils/sessionStorageKeys';

export const Topbar = () => {
	const [nomeUsuario, setNomeUsuario] = useState('');
	const [perfilUsuario, setPerfilUsuario] = useState('');

	const menu = useRef<Menu>(null);
	const navigate = useNavigate();
	const handleLogout = () => {
		const loginResponse = sessionStorage.getItem('LoginResponseDTO');
		navigate('/');
		console.log(loginResponse);
	};
	const items: MenuItem[] = [
		{
			label: 'Ajuda',
			icon: 'pi pi-refresh',
			command: () => {},
		},
		{
			label: 'Notificações',
			icon: 'pi pi-bell',
			command: () => {},
		},
		{ separator: true },
		{
			label: 'Logout',
			icon: 'pi pi-power-off',
			command: () => {
				handleLogout();
			},
		},
	];

	useEffect(() => {
		const nomeUsuario = sessionStorage.getItem(NOME_USUARIO_KEY) ?? '';
		setNomeUsuario(nomeUsuario);

		const perfilUsuario = sessionStorage.getItem(PERFIL_USUARIO_KEY) ?? '';
		setPerfilUsuario(perfilUsuario);
	}, []);

	return (
		<div className="flex mx-4 my-3 " style={{ width: 'calc(100vw - 278px)' }}>
			<span className="p-input-icon-left w-full">
				<i className="pi pi-search" />
				<InputText
					placeholder="Buscar Agendamentos pacientes ou etc..."
					className="w-full"
				/>
			</span>
			<div
				className="border-solid border-1 p-1 ml-2"
				style={{
					borderColor: '#ced4da',
					borderRadius: '6px',
					maxHeight: '47.2px',
				}}
			>
				<div className="flex card">
					<Avatar
						label={useObterIniciais(nomeUsuario)}
						style={{ width: '36px', height: '36px' }}
						shape="circle"
					/>
					<div className="flex text-center">
						<div style={{ width: '130px' }}>
							<span className="font-semibold">{nomeUsuario}</span>
							<br />
							<span>{perfilUsuario}</span>
						</div>
						<div className="flex align-items-center">
							<Menu model={items} popup ref={menu} />
							<Button
								text
								style={{ width: '30px', height: '30px' }}
								icon="pi pi-angle-down"
								onClick={(e) => {
									if (menu.current) menu.current.toggle(e);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
