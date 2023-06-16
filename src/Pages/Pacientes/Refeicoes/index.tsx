import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { EditAlimento } from './EditAlimento';

export const Refeicoes = ({ visible, onHide, rowSelected }: any) => {
	const [editMode, setEditMode] = useState(false);
	const [alimentoSelected, setAlimentoSelected] = useState();
	const [alimentosTable, setAlimentosTable] = useState([]);

	useEffect(() => {
		console.log(alimentosTable);
	}, [alimentosTable]);
	useEffect(() => {
		setEditMode(false);
	}, []);
	const {
		control,
		formState: { errors },
		register,
		handleSubmit,
		setValue,
		reset,
	} = useForm();
	const handleOnClose = () => {
		onHide();
		reset();
		setValue('horario', '');
		setTimeout(() => {
			setEditMode(false);
		}, 500);
	};
	const getFormErrorMessage = (errors: any) => {
		if (errors?.type === 'required') {
			return <span className="p-error">Campo Obrigatório</span>;
		}
	};

	const actionsColumns = (alimento: any) => {
		return (
			<div style={{ display: 'flex', width: '70px' }}>
				<Button
					type="button"
					icon="pi pi-trash"
					style={{ height: '20px' }}
					severity="danger"
					className=" p-button-text mr-2"
					onClick={() => {
						const novoArray = alimentosTable.filter(
							(objeto: any) => objeto.id !== alimento.id
						);
						// setAlimentosTable((prev: any) => {
						// 	return prev.filter((item: any) => {
						// 		item.id !== alimento.id;
						// 	});
						// });
						console.log(novoArray);
						console.log({ alimento });
						console.log({ alimentosTable });
					}}
				/>
			</div>
		);
	};

	const onSubmit = (data: any) => {
		console.log(data);
	};

	useEffect(() => {
		if (!visible || !rowSelected) return;
		setValue('descricao', rowSelected?.nome);
		setValue('horario', rowSelected?.horario);
		setValue('observacoes', rowSelected?.observacoes);
	}, [visible]);

	const showTable = () => {
		if (editMode) return;
		return (
			<div>
				<form action="" onSubmit={handleSubmit(onSubmit)}>
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
						value={alimentosTable}
						scrollHeight="400px"
						emptyMessage="Nenhuma refeição cadastrada"
					>
						<Column field="alimento" header="Alimento"></Column>
						<Column field="quantidade" header="Quantidade"></Column>
						<Column
							body={(data) => actionsColumns(data)}
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
									'p-invalid': errors.observacoes,
								},
								'mt-2 w-full'
							)}
							{...register('observacoes', {
								required: true,
							})}
						/>
						{getFormErrorMessage(errors.observacoes)}
					</div>
					<div className="flex justify-content-end">
						<Button
							type="button"
							text
							className="mt-3"
							onClick={() => {
								handleOnClose();
							}}
						>
							<i className="pi pi-times mr-2"></i>
							Cancelar
						</Button>
						<Button
							text
							type="submit"
							className="mt-3"
							onClick={() => {
								console.log('salvar');
							}}
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
				<EditAlimento
					onHide={() => {
						setEditMode(false);
					}}
					setAlimentosTable={setAlimentosTable}
					alimentoSelected={alimentoSelected}
					setAlimentoSelected={setAlimentoSelected}
				/>
			)}
		</Dialog>
	);
};
