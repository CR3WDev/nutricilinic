import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResultadosNutricionista = ({ resultadoAvaliacao }: any) => {

	const navigate = useNavigate();
	const [rowSelected, setRowSelected] = useState({ id: 4 });

	return (
		<div>
			<div>
				<Card>
					<DataTable
						responsiveLayout="scroll"
						scrollable
						scrollHeight="400px"
						value={resultadoAvaliacao}
					>
						<Column field="parametro" header="Tipo"></Column>
						<Column field="valorAtual" header="Atual"></Column>
						<Column field="recomendacao" header="Recomendação"></Column>
						<Column field="situacao" header="Situação"></Column>
					</DataTable>

					<div className="flex justify-content-end mt-3">
						<Button
							label="continuar"
							onClick={() => {
								navigate(`/plano-alimentar/${rowSelected.id}`);
								console.log('get informações do usuário');
							}}
						/>
					</div>
				</Card>
			</div>
		</div>
	);
};
