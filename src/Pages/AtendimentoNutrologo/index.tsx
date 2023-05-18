import { Card } from 'primereact/card';
import { Steps } from 'primereact/steps';
import { useEffect, useState } from 'react';
import { Conclusao } from './Conclusao';
import { DadosPaciente } from './DadosPaciente';
import { InformacoesConsulta } from './InformacoesConsulta';

export const AtendimentoNutrologo = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [formData, setFormData] = useState();
	const items = [
		{
			label: 'Dados do Paciente',
		},
		{
			label: 'Informações da consulta',
		},
		{
			label: 'Conclusão',
		},
	];
	useEffect(() => {
		console.log(formData);
	}, [formData]);
	const StepContent = () => {
		if (activeIndex === 0)
			return (
				<DadosPaciente
					setActiveIndex={setActiveIndex}
					activeIndex={activeIndex}
					setFormData={setFormData}
				/>
			);
		if (activeIndex === 1)
			return (
				<InformacoesConsulta
					setActiveIndex={setActiveIndex}
					setFormData={setFormData}
					formData={formData}
				/>
			);
		if (activeIndex === 2) return <Conclusao setActiveIndex={setActiveIndex} />;
	};
	return (
		<div>
			<h1 className="mb-4">Atendimento Nutrólogo</h1>
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
