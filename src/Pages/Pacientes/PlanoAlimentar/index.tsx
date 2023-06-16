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
import { Refeicoes } from '../Refeicoes';
import { api } from '../../../Services/axios';


interface PlanoAlimentarScreemProps {
	idAtendimento?: number;
}

interface PlanoAlimentarProps {
	id: number;
	descricao: string;
	segunda: boolean;
	terca: boolean;
	quarta: boolean;
	quinta: boolean;
	sexta: boolean
	sabado: boolean;
	domingo: boolean;
}

interface DiaSemanaProps {
	codigo: string;
	descricao: string;
	ativo: boolean;
}

interface AlimentoRefeicaoProps {
	descricao: string;
	idAlimento: number;
	quantidade: number;
	idMedida: number;
}

interface RefeicaoProps {
	descricao: string;
	horario: string;
	alimentos: AlimentoRefeicaoProps[];
	observacao: string;
}

export const PlanoAlimentar = ({ idAtendimento }: PlanoAlimentarScreemProps) => {

	const [rowSelected, setRowSelected] = useState<any>();

	const [diasDaSemana, setDiasDaSemana] = useState<DiaSemanaProps[]>([
		{
			codigo: "SEGUNDA",
			descricao: "Segunda",
			ativo: true
		},
		{
			codigo: "TERCA",
			descricao: "Terça",
			ativo: true
		},
		{
			codigo: "QUARTA",
			descricao: "Quarta",
			ativo: true
		},
		{
			codigo: "QUINTA",
			descricao: "Quinta",
			ativo: true
		},
		{
			codigo: "SEXTA",
			descricao: "Sexta",
			ativo: true
		},
		{
			codigo: "SABADO",
			descricao: "Sabado",
			ativo: true
		},
		{
			codigo: "DOMINGO",
			descricao: "Domingo",
			ativo: true
		}
	]);

	const [planoAlimentar, setPlanoAlimentar] = useState<PlanoAlimentarProps>();

	const [refeicoes, setRefeicoes] = useState<RefeicaoProps[]>([]);

	const [refeicao, setRefeicao] = useState<RefeicaoProps>();

	const {
		handleSubmit,
		control,
		formState: { errors, isLoading },
		register,
	} = useForm();

	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [openRefeicoes, setOpenRefeicoes] = useState(false);
	const [refeicaoSelected, setRefeicaoSelected] = useState<any>();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function buscarPacienteDoAtendimento(idAtendimento: number) {

		const response = await api.get(`/atendimentos/${idAtendimento}/paciente`);
		const { data } = response;
		setRowSelected({
			id: data.id,
			nome: data.nome,
			sexo: data.sexo,
			dataNascimento: data.dataNascimento,
			idade: data.idade,
		});
	}

	async function buscarPlanoAlimentarDoAtendimento(idAtendimento: number) {

	}

	useEffect(() => {
		if (idAtendimento) {
			buscarPacienteDoAtendimento(idAtendimento);
		}
	}, [idAtendimento]);

	useEffect(() => {
		if (idAtendimento) {
			buscarPlanoAlimentarDoAtendimento(idAtendimento);
		}
	}, [idAtendimento]);

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

	const onSubmit = async (formData: any) => {

		const data = {
			segunda: diasDaSemana.find(dia => dia.codigo === "SEGUNDA")?.ativo,
			terca: diasDaSemana.find(dia => dia.codigo === "TERCA")?.ativo,
			quarta: diasDaSemana.find(dia => dia.codigo === "QUARTA")?.ativo,
			quinta: diasDaSemana.find(dia => dia.codigo === "QUINTA")?.ativo,
			sexta: diasDaSemana.find(dia => dia.codigo === "SEXTA")?.ativo,
			sabado: diasDaSemana.find(dia => dia.codigo === "SABADO")?.ativo,
			domingo: diasDaSemana.find(dia => dia.codigo === "DOMINGO")?.ativo,
			descricao: formData.descricao,
			refeicoes
		};

		const response = api.post(`/atendimentos/${idAtendimento}/plano-alimentar`, data);



	};

	const onSave = () => {

	};

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
						Prontuário:<span> {rowSelected?.id}</span>
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
												offLabel={diaDaSemana.descricao}
												onLabel={diaDaSemana.descricao}
												checked={diaDaSemana.ativo}
												onChange={() => {
													const diasSemanaAtualizado = diasDaSemana.map(dia => {
														if (dia === diaDaSemana) {
															return {
																...dia,
																ativo: !dia.ativo
															}
														} else {
															return dia;
														}
													})
													setDiasDaSemana(diasSemanaAtualizado);
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
															{refeicao.descricao}
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
											return <p key={index}> - {alimento.descricao}</p>;
										})}
									</AccordionTab>
								);
							})}
						</Accordion>
					</div>
				</Card>

				<div className="my-3 flex justify-content-end">
					<Button className='mr-3' label="Salvar" loading={isLoading} />
					<Button type="submit">Finalizar</Button>
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
