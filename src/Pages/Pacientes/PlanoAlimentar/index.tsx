import { Accordion, AccordionTab } from 'primereact/accordion';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { ToggleButton } from 'primereact/togglebutton';
import { classNames } from 'primereact/utils';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMode } from '../../../Redux/mode';
import { refeicoes } from '../../../Utils/mock/refeicoes';
import { Refeicoes } from '../Refeicoes';

export const PlanoAlimentar = () => {
	const [rowSelected, setRowSelected] = useState<any>();
	const diasDaSemana = [
		'Segunda',
		'Terça',
		'Quarta',
		'Quinta',
		'Sexta',
		'Sábado',
		'Domingo',
	];
	const {
		handleSubmit,
		control,
		formState: { errors },
		register,
		setValue,
	} = useForm();

	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [openRefeicoes, setOpenRefeicoes] = useState(false);
	const [refeicaoSelected, setRefeicaoSelected] = useState<any>();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [diasSelecionados, setDiasSelecionados] = useState<Array<string>>([]);
	const selecionarDia = (dia: string) => {
		setDiasSelecionados((prev) =>
			!prev.includes(dia)
				? (prev = [...diasSelecionados, dia])
				: (prev = prev.filter((dias) => dias !== dia))
		);
	};
	useEffect(() => {
		setRowSelected({
			id: 1,
			nome: 'Marcos Gomes da Silva',
			sexo: 'MASCULINO',
			dataNascimento: '1995-04-11',
			idade: 28,
		});
		console.log('Requisição para buscar os dados do usuário');
	}, []);
	useEffect(() => {
		return () => {
			dispatch(setMode('search'));
		};
	}, []);
	const getFormErrorMessage = (errors: any) => {
		if (errors?.type === 'required') {
			return <span className="p-error">Campo Obrigatório</span>;
		}
	};
	const onSubmit = (data: any) => {
		console.log(data);
	};
	const onSave = () => {
		dispatch(setMode('search'));
		navigate('/pacientes');
		console.log('Dados salvo com sucesso!');
	};
	useEffect(() => {
		setValue('diasSemana', diasSelecionados);
	}, [diasSelecionados]);

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
								navigate('/pacientes');
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card className="my-3">
					<div>
						<h3>Dias da semana:</h3>
					</div>
					<div className="flex justify-content-between mt-3">
						{diasDaSemana.map((diaDaSemana, index) => {
							return (
								<Controller
									name="diasSemana"
									key={index}
									control={control}
									render={({ field, fieldState }) => (
										<div className="flex flex-column align-items-center gap-2">
											<ToggleButton
												offLabel={diaDaSemana}
												onLabel={diaDaSemana}
												checked={diasSelecionados.includes(diaDaSemana)}
												onChange={() => {
													selecionarDia(diaDaSemana);
												}}
											/>
											{getFormErrorMessage(field.name)}
										</div>
									)}
								/>
							);
						})}
					</div>
				</Card>
				<Card className="my-3">
					<div className="mb-3">
						<h3>Descrição:</h3>
					</div>
					<InputTextarea
						className={classNames(
							{
								'p-invalid': errors.descricao,
							},
							'w-full'
						)}
						{...register('descricao', {
							required: true,
						})}
						placeholder="Descrição"
					/>
					{getFormErrorMessage(errors.descricao)}
				</Card>
				<Card>
					<div>
						<div className="flex align-items-center justify-content-between">
							<div>
								<h3>Refeições:</h3>
							</div>
							<div>
								<Button
									type="button"
									label="adicionar"
									onClick={() => {
										setOpenRefeicoes(true);
									}}
								></Button>
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
															{refeicao.horario}
														</span>
													</div>
												</div>
												<div className="ml-2">
													<Button
														text
														icon="pi pi-pencil"
														severity="success"
														type="button"
														onClick={(event) => {
															setRefeicaoSelected(refeicao);
															setOpenRefeicoes(true);
															event.stopPropagation();
														}}
													></Button>
													<Button
														text
														className="ml-2"
														type="button"
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
							type="button"
							onClick={() => {
								dispatch(setMode('search'));
								navigate('/pacientes');
							}}
						>
							Voltar
						</Button>
					</div>
					<div>
						<Button
							className="mr-3"
							type="button"
							onClick={() => {
								onSave();
							}}
						>
							Salvar
						</Button>
						<Button type="submit">Finalizar</Button>
					</div>
				</div>
			</form>

			<Refeicoes
				setRowSelected={setRefeicaoSelected}
				rowSelected={refeicaoSelected}
				visible={openRefeicoes}
				onHide={() => {
					setOpenRefeicoes(false);
					setRefeicaoSelected(undefined);
				}}
			/>
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
