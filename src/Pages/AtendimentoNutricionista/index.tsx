import { Steps } from 'primereact/steps';

export const AtendimentoNutricionista = () => {
	const items = [
		{
			label: 'Personal',
		},
		{
			label: 'Seat',
		},
		{
			label: 'Payment',
		},
		{
			label: 'Confirmation',
		},
	];
	return (
		<div>
			<h1>Informações gerais do paciente</h1>
			<Steps model={items} />
		</div>
	);
};
