import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';

export const ResultadosNutricionista = ({ setActiveIndex }: any) => {
	const navigate = useNavigate();
	return (
		<div>
			<Card>
				<DataTable responsiveLayout="scroll" scrollable scrollHeight="400px">
					<Column field="tipo" header="Tipo"></Column>
					<Column field="atual" header="Atual"></Column>
					<Column field="recomendacao" header="Recomendação"></Column>
					<Column field="situacao" header="Situação"></Column>
				</DataTable>
				<div className="flex justify-content-end mt-3">
					<Button
						label="continuar"
						onClick={() => {
							navigate('/pacientes');
						}}
					/>
				</div>
			</Card>
		</div>
	);
};
