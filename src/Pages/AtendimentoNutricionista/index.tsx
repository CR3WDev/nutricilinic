import { Card } from 'primereact/card';
import { Steps } from 'primereact/steps';
import { useEffect, useState } from 'react';
import { PlanoAlimentar } from '../Pacientes/PlanoAlimentar';
import { AvaliacaoFisica } from './AvaliacaoFisica';
import { DadosPaciente } from './DadosPaciente/index';
import { ResultadosNutricionista } from './ResultadosNutricionista';

export const AtendimentoNutricionista = () => {
	const [idAtendimento, setIdAtendimento] = useState();
	const [resultadoAvalicao, setResultadoAvalicao] = useState([]);

	const [activeIndex, setActiveIndex] = useState(0);
	const [formData, setFormData] = useState();
	const items = [
		{
			label: 'Dados do Paciente',
		},
		{
			label: 'Avaliação Física',
		},
		{
			label: 'Resultados',
		},
		{
			label: 'Plano Alimentar',
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
					setIdAtendimento={setIdAtendimento}
				/>
			);
		if (activeIndex === 1)
			return (
				<AvaliacaoFisica
					setActiveIndex={setActiveIndex}
					setFormData={setFormData}
					idAtendimento={idAtendimento}
					setResultadoAvalicao={setResultadoAvalicao}
				/>
			);
		if (activeIndex === 2)
			return (
				<ResultadosNutricionista
					setActiveIndex={setActiveIndex}
					resultadoAvaliacao={resultadoAvalicao}
					idAtendimento={idAtendimento}
				/>
			);

		if (activeIndex === 3)
			return <PlanoAlimentar idAtendimento={idAtendimento} />;
	};
	return (
		<div>
			<h1 className="mb-4">Atendimento Nutricionista</h1>
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
