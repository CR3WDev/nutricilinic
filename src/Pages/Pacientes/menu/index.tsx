import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { DataView } from 'primereact/dataview';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, useMode } from '../../../Redux/mode';
import { pacientes3 } from '../../../Utils/mock/pacientes';
import { PacientesView } from '../view';

export const PacientesMenu = () => {
	const mode = useSelector(useMode);
	const dispatch = useDispatch();
	const [rowSelected, setRowSelected] = useState();
	useEffect(() => {
		console.log(mode);
	}, []);
	const itemTemplate = (obj: any) => {
		console.log(obj);
		return (
			<div className="flex w-full">
				<div className="h-full flex align-items-center mx-2">
					<Checkbox checked={true}></Checkbox>
				</div>
				<div className="h-full flex align-items-center w-full">
					<Avatar
						className="mr-2"
						icon="pi pi-user"
						size="xlarge"
						shape="circle"
					/>
					<div className="my-3">
						<div>
							<span className="font-bold">{obj.nome}</span>
						</div>
						<div>
							<span>{obj.idade}</span> anos
							<span> {obj.sexo}</span>
						</div>
						<div>
							Pontuário:<span> {obj.pontuario}</span>
						</div>
					</div>
				</div>
				<div className="flex align-items-center">
					<Button
						onClick={() => {
							dispatch(setMode('info'));
							setRowSelected(obj);
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
						icon="pi pi-chart-line"
						label="Plano alimentar"
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
						text
					/>
					<Button
						icon="pi pi-plus-circle"
						label="Iniciar atendimento nutricionista"
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
		if (mode !== 'info') return;
		return <PacientesView rowSelected={rowSelected} />;
	};
	return (
		<>
			{showMenu()}
			{showView()}
		</>
	);
};
