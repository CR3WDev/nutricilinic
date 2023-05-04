import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { DataView } from 'primereact/dataview';
import { pacientes3 } from '../../Utils/mock/pacientes';

export const PacientesPage = () => {
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
					<Button text icon="pi pi-search"></Button>
				</div>
			</div>
		);
	};
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
			<div className="card flex justify-content-center mt-3">
				<DataView
					style={{ maxWidth: '80%' }}
					value={pacientes3}
					itemTemplate={itemTemplate}
				/>
			</div>
		</div>
	);
};
