import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { api } from '../../../../Services/axios';

export const EditAlimento = ({
	setAlimentosTable,
	onHide,
	alimentoSelected,
	setAlimentoSelected,
}: any) => {
	const [alimentosAutocomplete, setAlimentosAutocomplete] = useState([]);
	const [medidas, setMedidas] = useState([]);
	const {
		formState: { errors },
		setValue,
		handleSubmit,
		watch,
		control,
	} = useForm();

	useEffect(() => {
		if (!alimentoSelected) return;
		setValue('alimento', alimentoSelected?.alimento);
		setValue('quantidade', alimentoSelected?.quantidade);
	}, [alimentoSelected]);

	const getFormErrorMessage = (errors: any) => {
		if (errors?.type === 'required') {
			return <span className="p-error">Campo Obrigatório</span>;
		}
	};
	const getAlimento = async (descricao: string) => {
		const response = await api.get(`alimentos?descricao=${descricao}`);
		setAlimentosAutocomplete(response.data);
	};
	const getMedidas = async () => {
		const response = await api.get('medidas');
		setMedidas(response.data);
	};
	const onSubmit = (data: any) => {
		setAlimentosTable((prev: any) => [
			...prev,
			{
				id: new Date().getMilliseconds(),
				alimento: watch('alimento'),
				quantidade: watch('Quantidade') + watch('Medida').descricao,
			},
		]);
		onHide();
	};

	useEffect(() => {
		getMedidas();
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex">
				<div className="col-4 flex flex-column">
					<label className="font-bold">Alimento</label>
					<Controller
						name="alimento"
						control={control}
						rules={{ required: 'Alimento é Obrigatório' }}
						render={({ field, fieldState }) => (
							<AutoComplete
								{...field}
								field="descricao"
								placeholder="alimento"
								suggestions={alimentosAutocomplete}
								completeMethod={(e) => {
									if (e.query.length >= 3) getAlimento(e.query);
								}}
								id="alimento"
								className={classNames(
									{
										'p-invalid': errors.alimento,
									},
									'mt-2'
								)}
								aria-describedby="nomeCompleto-help"
							></AutoComplete>
						)}
					/>
					{getFormErrorMessage(errors?.alimento)}
				</div>
				<div className="col-4 flex flex-column  mx-2">
					<label className="font-bold">Quantidade</label>
					<Controller
						name="Quantidade"
						control={control}
						rules={{ required: 'Campo é obrigatório' }}
						render={({ field }) => (
							<InputNumber
								onValueChange={(e) => field.onChange(e)}
								value={field.value}
								locale="pt-BR"
								minFractionDigits={2}
								placeholder="Quantidade"
								id="Quantidade"
								className={classNames(
									{
										'p-invalid': errors.Quantidade,
									},
									'mt-2'
								)}
							/>
						)}
					/>
					{getFormErrorMessage(errors?.quantidade)}
				</div>
				<div className="col-4 flex flex-column">
					<label className="font-bold">Medida</label>
					<Controller
						name="Medida"
						control={control}
						rules={{ required: 'Campo Obrigatório' }}
						render={({ field, fieldState }) => (
							<Dropdown
								id={field.name}
								value={field.value}
								optionLabel="descrica"
								placeholder="Selecione uma medida"
								options={medidas}
								className={classNames(
									{
										'p-invalid': errors.Medida,
									},
									'mt-2'
								)}
								focusInputRef={field.ref}
								onChange={(e) => field.onChange(e.value)}
							/>
						)}
					/>
					{getFormErrorMessage(errors?.Medida)}
				</div>
			</div>
			<div className="flex justify-content-end">
				<Button
					type="button"
					text
					className="mt-3"
					onClick={() => {
						onHide();
						setAlimentoSelected(undefined);
					}}
				>
					<i className="pi pi-times mr-2"></i>
					Cancelar
				</Button>
				<Button text className="mt-3">
					<i className="pi pi-check mr-2"></i>
					Salvar
				</Button>
			</div>
		</form>
	);
};
