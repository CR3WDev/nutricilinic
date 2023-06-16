import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { DataView } from 'primereact/dataview';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMode } from '../../../Redux/mode';
import { api } from '../../../Services/axios';

export const PacientesMenu = () => {
	const mode = useSelector(useMode);
	const navigate = useNavigate();
	const [rowSelected, setRowSelected] = useState<any>();
	const [pacientes, setPacientes] = useState([]);

	async function carregarPacientes() {
		const response = await api.get('/nutricionista/pacientes');
		setPacientes(response.data);
	}

	useEffect(() => {
		carregarPacientes();
	}, []);

	const itemTemplate = (paciente: any) => {
		return (
			<div className="flex w-full">
				<div className="h-full flex align-items-center w-full">
					<Avatar
						className="mr-2"
						icon="pi pi-user"
						size="xlarge"
						shape="circle"
					/>
					<div className="my-3 w-full">
						<div>
							<span className="font-bold">{paciente?.nome}</span>
						</div>
						<div>
							<span>{paciente?.idade}</span> anos
							<span> {paciente?.sexo}</span>
						</div>
						<div>
							Prontuário:<span> {paciente?.id}</span>
						</div>
					</div>
				</div>
				<div className="flex align-items-center">
					<Button
						onClick={() => {
							navigate(`/paciente-historico/${paciente.id}/paciente`);
							setRowSelected(paciente);
						}}
						text
						icon="pi pi-search"
					></Button>
				</div>
			</div>
		);
	};
	const showMenu = () => {
		if (mode !== 'search') return <></>;
		return (
			<div>
				<div className="flex justify-content-between">
					<Button
						icon="pi pi-sliders-v"
						label="Filtros"
						severity="secondary"
						text
					/>
					<Button
						icon="pi pi-plus-circle"
						label="Novo acompanhamento"
						severity="secondary"
						onClick={() => {
							navigate('/acompanhamento');
						}}
						text
					/>
					<Button
						icon="pi pi-plus-circle"
						label="Iniciar atendimento nutricionista"
						onClick={() => {
							navigate('/atendimento-nutricionista');
						}}
						severity="secondary"
						text
					/>
				</div>
				<Card>
					<DataView value={pacientes} itemTemplate={itemTemplate} />
				</Card>
			</div>
		);
	};

	return showMenu();
};
