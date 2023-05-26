import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState } from 'react';
import { Refeicoes } from '../../Pacientes/Refeicoes';

export const ResultadosNutricionista = ({ setActiveIndex, resultadoAvaliacao }: any) => {
	const [openRefeicoes, setOpenRefeicoes] = useState(false);

	console.log(resultadoAvaliacao)

	return (
		<div>
			<div>
				<Card>
					<DataTable responsiveLayout="scroll" scrollable scrollHeight="400px" value={resultadoAvaliacao}>
						<Column field="parametro" header="Tipo"></Column>
						<Column field="valorAtual" header="Atual"></Column>
						<Column field="recomendacao" header="Recomendação"></Column>
						<Column field="situacao" header="Situação"></Column>
					</DataTable>
					<div className="flex justify-content-end mt-3">
						<Button
							label="continuar"
							onClick={() => {
								setOpenRefeicoes(true);
							}}
						/>
					</div>
				</Card>
			</div>
			<Refeicoes
				visible={openRefeicoes}
				onHide={() => {
					setOpenRefeicoes(false);
				}}
			/>
		</div>
	);
};
