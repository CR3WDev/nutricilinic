import { Accordion, AccordionTab } from 'primereact/accordion';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { ToggleButton } from 'primereact/togglebutton';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMode } from '../../../Redux/mode';
import { refeicoes } from '../../../Utils/mock/refeicoes';

export const PlanoAlimentar = ({ rowSelected }: any) => {
	const diasDaSemana = [
		'Segunda',
		'Terça',
		'Quarta',
		'Quinta',
		'Sexta',
		'Sábado',
		'Domingo',
	];
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const dispatch = useDispatch();
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
	useEffect(() => {
		return () => {
			dispatch(setMode('search'));
		};
	}, []);
	const dialogContent = (mode: string) => {
		if (mode === 'finish')
			return (
				<>
					<div className="flex justify-content-center flex-column align-items-center">
						<h3>Atendimento Finalizado com Sucesso!</h3>
						<div>
							<i
								style={{
									fontSize: 100,
									color: '#28A745',
									marginTop: '30px',
									marginBottom: '30px',
								}}
								className="pi pi-check-circle"
							></i>
						</div>
					</div>
					<div className="flex justify-content-center">
						<Button
							label="finalizar"
							onClick={() => {
								dispatch(setMode('search'));
							}}
						/>
					</div>
				</>
			);
	};
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
						<span className="font-bold">{rowSelected?.nome}</span>
					</div>
					<div>
						<span>{rowSelected?.idade}</span> anos
						<span> {rowSelected?.sexo}</span>
					</div>
					<div>
						Pontuário:<span> {rowSelected?.pontuario}</span>
					</div>
				</div>
			</div>
			<Card className="my-3">
				<div>
					<h3>Dias da semana:</h3>
				</div>
				<div className="flex justify-content-between mt-3">
					{diasDaSemana.map((diaDaSemana, index) => {
						return (
							<div key={index}>
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
						{refeicoes.map((refeicao, index) => {
							return (
								<AccordionTab
									key={index}
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
									{refeicao.alimentos.map((alimento, index) => {
										return <p key={index}> - {alimento.nome}</p>;
									})}
								</AccordionTab>
							);
						})}
					</Accordion>
				</div>
			</Card>
			<div className="my-3 flex justify-content-between">
				<div>
					<Button
						onClick={() => {
							dispatch(setMode('search'));
						}}
					>
						Voltar
					</Button>
				</div>
				<div>
					<Button
						className="mr-3"
						onClick={() => {
							dispatch(setMode('search'));
						}}
					>
						Salvar
					</Button>
					<Button
						onClick={() => {
							setIsOpenDialog(true);
						}}
					>
						Finalizar
					</Button>
				</div>
			</div>
			<Dialog
				visible={isOpenDialog}
				closable={false}
				draggable={false}
				onHide={() => {
					setIsOpenDialog(false);
				}}
				children={dialogContent('finish')}
			></Dialog>
		</div>
	);
};
