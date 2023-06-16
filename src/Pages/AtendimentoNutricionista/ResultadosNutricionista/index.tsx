import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';

export const ResultadosNutricionista = ({ resultadoAvaliacao, setActiveIndex }: any) => {

	const navigate = useNavigate();

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
								setActiveIndex((prev: any) => prev + 1)
							}}
						/>
					</div>
				</Card>
			</div>
		</div>
	);
};
