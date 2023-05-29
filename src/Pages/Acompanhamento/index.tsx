import { Card } from 'primereact/card';
import { Steps } from 'primereact/steps';
import { useState } from 'react';
import { Conclusao } from './Conclusao';
import { DadosAcompanhamento } from './DadosAcompanhamento';

export const Acompanhamento = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [formData, setFormData] = useState();
	const items = [
		{
			label: 'Encaminhamento',
		},
		{
			label: 'Conclusão',
		},
	];

	const StepContent = () => {
		if (activeIndex === 0)
			return (
				<DadosAcompanhamento
					setActiveIndex={setActiveIndex}
					activeIndex={activeIndex}
					setFormData={setFormData}
				/>
			);
		if (activeIndex === 1) return <Conclusao />;
	};
	return (
		<div>
			<h1 className="mb-4">Novo Acompanhamento</h1>
			<Card>
				<Steps
					model={items}
					activeIndex={activeIndex}
					onSelect={(e: any) => setActiveIndex(e.index)}
				/>
				<div className="mt-4">{StepContent()}</div>
			</Card>
		</div>
	);
};
