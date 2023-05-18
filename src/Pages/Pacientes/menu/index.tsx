import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { DataView } from 'primereact/dataview';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMode, useMode } from '../../../Redux/mode';
import { api } from '../../../Services/axios';
import { pacientes3 } from '../../../Utils/mock/pacientes';
import { PlanoAlimentar } from '../PlanoAlimentar';
import { PacientesInfo } from '../info';

export const PacientesMenu = () => {
	const mode = useSelector(useMode);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [rowSelected, setRowSelected] = useState();
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
					<div className="my-3">
						<div>
							<span className="font-bold">{paciente.nome}</span>
						</div>
						<div>
							<span>{paciente.idade}</span> anos
							<span> {paciente.sexo}</span>
						</div>
						<div>
							Prontuário:<span> {paciente.id}</span>
						</div>
					</div>
				</div>
				<div className="flex align-items-center">
					<Button
						onClick={() => {
							dispatch(setMode('view'));
							setRowSelected(paciente);
						}}
						text
						severity="warning"
						icon="pi pi-calendar"
					></Button>
					<Button
						onClick={() => {
							dispatch(setMode('info'));
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
						text
					/>
					<Button
						icon="pi pi-plus-circle"
						label="Iniciar atendimento nutrólogo"
						severity="secondary"
						onClick={() => {
							navigate('/atendimento-nutrologo');
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
				<Card className="flex justify-content-center mt-3 w-full">
					<DataView value={pacientes3} itemTemplate={itemTemplate} />
				</Card>
			</div>
		);
	};
	const showView = () => {
		if (mode !== 'info') return <></>;
		return <PacientesInfo rowSelected={rowSelected} />;
	};
	const showPlanoAlimentar = () => {
		if (mode !== 'view') return <></>;
		return <PlanoAlimentar rowSelected={rowSelected} />;
	};
	return (
		<>
			{showMenu()}
			{showView()}
			{showPlanoAlimentar()}
		</>
	);
};
