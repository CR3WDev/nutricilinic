import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Alimentos } from '../../../Utils/mock/alimentos';

export const Refeicoes = ({ visible, onHide }: any) => {
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
		<Dialog visible={visible} onHide={onHide} header="Refeições">
			<div></div>
			<DataTable
				responsiveLayout="scroll"
				scrollable
				value={Alimentos}
				scrollHeight="400px"
				emptyMessage="Nenhuma refeição cadastrada"
			>
				<Column field="alimento" header="Alimento"></Column>
				<Column field="proteinas" header="Proteínas"></Column>
				<Column field="carboidratos" header="Carboidratos"></Column>
				<Column field="lipidios" header="Lipídeos"></Column>
				<Column field="calorias" header="Calorias"></Column>
				<Column field="quantidade" header="Quantidade"></Column>
				<Column
					body={(data) => actionsColumns(data)}
					header={'ações'}
					className="py-2"
				/>
			</DataTable>
		</Dialog>
	);
};
