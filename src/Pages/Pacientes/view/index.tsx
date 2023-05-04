import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { useDispatch } from 'react-redux';
import { setMode } from '../../../Redux/mode';
import { registros } from '../../../Utils/mock/registros';

export const PacientesView = ({ rowSelected }: any) => {
	const dispatch = useDispatch();
	const actionsColumns = (usuario: any) => {
		return (
			<div style={{ display: 'flex', width: '70px' }}>
				<Button
					icon="pi pi-search"
					style={{ height: '20px' }}
					className=" p-button-text mr-2"
					onClick={() => console.log('oi')}
				/>
			</div>
		);
	};
	return (
		<section>
			<h1>Histórico do paciente</h1>
			<Card className="mt-3">
				<div className="h-full flex align-items-center w-full">
					<Avatar
						className="mr-2"
						icon="pi pi-user"
						size="xlarge"
						shape="circle"
					/>
					<div className="my-3">
						<div>
							<span className="font-bold">{rowSelected.nome}</span>
						</div>
						<div>
							<span>{rowSelected.idade}</span> anos
							<span> {rowSelected.sexo}</span>
						</div>
						<div>
							Pontuário:<span> {rowSelected.pontuario}</span>
						</div>
					</div>
				</div>
				<Divider />
				<DataTable
					responsiveLayout="scroll"
					value={registros}
					scrollable
					scrollHeight="400px"
				>
					<Column field="registro" header="Registro"></Column>
					<Column field="data" header="Data"></Column>
					<Column field="doutor" header="Doutor(a)"></Column>
					<Column
						body={(data) => actionsColumns(data)}
						header={'ações'}
						className="py-2"
					/>
				</DataTable>
				<div className="flex justify-content-end mt-3">
					<Button
						text
						onClick={() => {
							dispatch(setMode('search'));
						}}
					>
						Voltar
					</Button>
				</div>
			</Card>
		</section>
	);
};
