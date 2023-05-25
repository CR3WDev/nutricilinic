import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMode } from '../../../Redux/mode';
import { api } from '../../../Services/axios';

export const PacientesHistorico = ({ rowSelected }: any) => {
	const [historico, setHistorico] = useState([]);

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

	async function buscarHistorico() {
		const response = await api.get(
			`/nutricionista/pacientes/${rowSelected.id}/historico`
		);
		setHistorico(response.data);
	}

	useEffect(() => {
		buscarHistorico();
	}, []);

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
					value={historico}
					scrollable
					scrollHeight="400px"
					emptyMessage="Paciente não possui histórico"
				>
					<Column field="dataExtenso" header="Data"></Column>
					<Column field="descricaoOcorrencia" header="Registro"></Column>
					<Column field="usuarioOcorrencia" header="Doutor(a)"></Column>
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
