import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AlimentoModal } from './AlimentoModal';
import { AlimentoRefeicaoProps, RefeicaoProps } from '../PlanoAlimentar';

interface RefeicaoModalProps {
	visible: boolean;
	onHide: () => void;
	addRefeicao: (refeicao: RefeicaoProps) => void;
	replaceRefeicao: (refeicao: RefeicaoProps) => void;
	refeicaoSelected?: RefeicaoProps;
}

interface FormData {
	horario: string;
	descricao: string;
	observacao: string;
}

export const RefeicaoModal = ({
	visible,
	onHide,
	addRefeicao,
	replaceRefeicao,
	refeicaoSelected
}: RefeicaoModalProps) => {

	const [editMode, setEditMode] = useState(false);
	const [alimentosAdicionados, setAlimentosAdicionados] = useState<AlimentoRefeicaoProps[]>([]);

	const toast = useRef<any>(null);

	const {
		control,
		formState: { errors },
		register,
		handleSubmit,
		reset,
		setValue
	} = useForm<FormData>();

	const handleOnClose = () => {
		onHide();
		setTimeout(() => {
			setEditMode(false);
		}, 500);
	};
	const getFormErrorMessage = (errors: any) => {
		if (errors?.type === 'required') {
			return <span className="p-error">Campo Obrigatório</span>;
		}
	};

	const actionsColumns = (rowIndex: number) => {
		return (
			<div style={{ display: 'flex', width: '70px' }}>
				<Button
					type="button"
					icon="pi pi-trash"
					style={{ height: '20px' }}
					severity="danger"
					className=" p-button-text mr-2"
					onClick={() => handleRemoverAlimento(rowIndex)}
				/>
			</div>
		);
	};

	function handleRemoverAlimento(index: number) {
		const alimentosAtualizados = alimentosAdicionados.toSpliced(index, 1);
		setAlimentosAdicionados(alimentosAtualizados);
	}

	async function handleAddAlimento(novoAlimento: AlimentoRefeicaoProps) {
		setAlimentosAdicionados([...alimentosAdicionados, novoAlimento]);
	}

	const onSubmit = (data: FormData) => {
		if (alimentosAdicionados.length <= 0) {
			return toast.current?.show({
				severity: 'error',
				summary: 'Atenção',
				detail: 'Deve ser adicionado pelo menos 1 alimento!',
			});
		}

		const novaRefeicao = {
			horario: data.horario,
			descricao: data.descricao,
			observacao: data.observacao,
			alimentos: alimentosAdicionados
		};

		if (refeicaoSelected) {
			replaceRefeicao(novaRefeicao);
		} else {
			addRefeicao(novaRefeicao);
		}

		onHide();
	};

	function limparFormulario() {
		reset();
		setAlimentosAdicionados([]);
	}

	useEffect(() => {
		if (visible) {
			limparFormulario();
		}
	}, [visible]);

	useEffect(() => {
		if (refeicaoSelected) {
			setValue("horario", refeicaoSelected.horario);
			setValue("descricao", refeicaoSelected.descricao);
			setValue("observacao", refeicaoSelected.observacao);
			setAlimentosAdicionados(refeicaoSelected.alimentos);
		}
	}, [refeicaoSelected]);

	const showTable = () => {
		if (editMode) return;

		return (
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex">
						<div className="col-6">
							<Controller
								name="horario"
								control={control}
								rules={{ required: 'Phone is required.' }}
								render={({ field, fieldState }) => (
									<div className="flex flex-column">
										<label htmlFor={field.name}>Horário</label>

										<InputMask
											id={field.name}
											value={field.value}
											className={classNames(
												{ 'p-invalid': errors?.horario },
												'mt-2'
											)}
											onChange={(e) => field.onChange(e.target.value)}
											mask="99:99"
											placeholder="Horário"
										/>

										{getFormErrorMessage(errors?.horario)}
									</div>
								)}
							/>
						</div>
						<div className="col-6 flex flex-column">
							<label className="font-bold" htmlFor="descricao">
								Descricao
							</label>

							<InputText
								placeholder="Descricao"
								id="descricao"
								className={classNames(
									{
										'p-invalid': errors.descricao,
									},
									'mt-2'
								)}
								aria-describedby="nomeCompleto-help"
								{...register('descricao', {
									required: true,
								})}
							/>
							{getFormErrorMessage(errors?.descricao)}
						</div>
					</div>

					<DataTable
						scrollable
						value={alimentosAdicionados}
						scrollHeight="400px"
						emptyMessage="Nenhum alimento adicionado"
					>
						<Column
							header="Alimento"
							field='descricao'
						/>

						<Column
							header="Quantidade"
							body={alimento => `${alimento.quantidade}  ${alimento.descricaoMedida}`}
						/>

						<Column
							body={(_, options) => actionsColumns(options.rowIndex)}
							header={'ações'}
							className="py-2"
						/>
					</DataTable>

					<div className="flex justify-content-end">
						<Button
							type="button"
							className="mt-3"
							onClick={() => {
								setEditMode(true);
							}}
						>
							<i className="pi pi-plus mr-2"></i>
							Adicionar Alimento
						</Button>
					</div>

					<div className="col-12">
						<label className="font-bold mb-2" htmlFor="observacoes">
							Observações:
						</label>

						<InputTextarea
							id="observacoes"
							placeholder="Observações"
							className={classNames(
								{
									'p-invalid': errors.observacao,
								},
								'mt-2 w-full'
							)}
							{...register('observacao')}
						/>
						{getFormErrorMessage(errors.observacao)}
					</div>

					<div className="flex justify-content-end">
						<Button
							type="button"
							text
							className="mt-3"
							onClick={handleOnClose}
						>
							<i className="pi pi-times mr-2"></i>
							Cancelar
						</Button>

						<Button
							text
							type="submit"
							className="mt-3"
						>
							<i className="pi pi-check mr-2"></i>
							Salvar
						</Button>
					</div>
				</form>
			</div>
		);
	};

	return (
		<>
			<Toast ref={toast} />

			<Dialog
				draggable={false}
				visible={visible}
				onHide={() => {
					handleOnClose();
				}}
				header="Refeições"
			>
				{showTable()}

				{editMode && (
					<AlimentoModal
						onHide={() => {
							setEditMode(false);
						}}
						addAlimento={handleAddAlimento}
					/>
				)}
			</Dialog>
		</>
	);
};
