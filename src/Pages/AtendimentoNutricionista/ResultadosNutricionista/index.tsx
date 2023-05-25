import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState } from 'react';
import { Refeicoes } from '../../Pacientes/Refeicoes';

export const ResultadosNutricionista = ({ setActiveIndex }: any) => {
	const [openRefeicoes, setOpenRefeicoes] = useState(false);

	return (
		<div>
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
