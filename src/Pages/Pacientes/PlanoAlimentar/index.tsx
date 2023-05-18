import { Accordion, AccordionTab } from 'primereact/accordion';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import { ToggleButton } from 'primereact/togglebutton';
import { useEffect, useState } from 'react';
import { refeicoes } from '../../../Utils/mock/refeicoes';

export const PlanoAlimentar = ({ rowSelected }: any) => {
	console.log({ rowSelected });
	const diasDaSemana = [
		'Segunda',
		'Terça',
		'Quarta',
		'Quinta',
		'Sexta',
		'Sábado',
		'Domingo',
	];
	const [diasSelecionados, setDiasSelecionados] = useState<Array<string>>([]);
	const [descricao, setDescricao] = useState<string>('');
	const selecionarDia = (dia: string) => {
		setDiasSelecionados((prev) =>
			!prev.includes(dia)
				? (prev = [...diasSelecionados, dia])
				: (prev = prev.filter((dias) => dias !== dia))
		);
	};

	useEffect(() => {
		console.log(diasSelecionados);
	}, [diasSelecionados]);

	return (
		<div>
			<h1>Refeições</h1>
			<div className="h-full flex align-items-center w-full">
				<Avatar
					className="mr-2"
					icon="pi pi-user"
					size="xlarge"
					shape="circle"
				/>
				<div className="my-3">
					<div>
						<span className="font-bold">{rowSelected.nome}</span>
					</div>
					<div>
						<span>{rowSelected.idade}</span> anos
						<span> {rowSelected.sexo}</span>
					</div>
					<div>
						Pontuário:<span> {rowSelected.pontuario}</span>
					</div>
				</div>
			</div>
			<Card className="my-3">
				<div>
					<h3>Dias da semana:</h3>
				</div>
				<div className="flex justify-content-between mt-3">
					{diasDaSemana.map((diaDaSemana) => {
						return (
							<div>
								<ToggleButton
									offLabel={diaDaSemana}
									onLabel={diaDaSemana}
									checked={diasSelecionados.includes(diaDaSemana)}
									onChange={() => {
										selecionarDia(diaDaSemana);
									}}
								/>
							</div>
						);
					})}
				</div>
			</Card>
			<Card className="my-3">
				<div className="mb-3">
					<h3>Descrição:</h3>
				</div>
				<InputTextarea
					className="w-full"
					placeholder="Descrição"
					value={descricao}
					onChange={(e) => {
						setDescricao(e.target.value);
					}}
				/>
			</Card>
			<Card>
				<div>
					<div className="flex align-items-center justify-content-between">
						<div>
							<h3>Refeições:</h3>
						</div>
						<div>
							<Button label="adicionar"></Button>
						</div>
					</div>
				</div>
				<div className="mt-3">
					<Accordion activeIndex={0}>
						{refeicoes.map((refeicao) => {
							return (
								<AccordionTab
									header={
										<div className="flex justify-conten-between">
											<div className="flex align-items-center">
												<div className="flex flex-column">
													<span className="vertical-align-middle">
														{refeicao.nome}
													</span>
													<span className="font-normal mt-1">
														{refeicao.horário}
													</span>
												</div>
											</div>
											<div className="ml-2">
												<Button
													text
													icon="pi pi-pencil"
													severity="success"
													onClick={(event) => {
														event.stopPropagation();
													}}
												></Button>
												<Button
													text
													className="ml-2"
													icon="pi pi-trash"
													severity="danger"
													onClick={(event) => {
														event.stopPropagation();
													}}
												></Button>
											</div>
										</div>
									}
								>
									{refeicao.alimentos.map((alimento) => {
										return <p> - {alimento.nome}</p>;
									})}
								</AccordionTab>
							);
						})}
					</Accordion>
				</div>
			</Card>
		</div>
	);
};
