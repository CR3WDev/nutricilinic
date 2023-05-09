import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { Controller, useForm } from 'react-hook-form';

export const InformacoesConsulta = ({
	setActiveIndex,
	setFormData,
	formData,
}: any) => {
	const cities = [
		{ name: 'Sim', value: true },
		{ name: 'Nao', value: false },
	];
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const getFormErrorMessage = (errors: any) => {
		if (errors?.type === 'required') {
			return <span className="p-error">Campo Obrigatório</span>;
		}
	};
	const onSubmit = (data: any) => {
		const response = {
			...formData,
			//Esse ta separado para quando você for formatar a data do jeito que preferir
			dataDeNascimento: formData.dataDeNascimento,
			...data,
		};
		setFormData(response);
		setActiveIndex((prev: number) => prev + 1);
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="col-6 flex flex-column">
					<Controller
						name="encaminhar"
						control={control}
						rules={{ required: true }}
						render={({ field, fieldState }) => (
							<>
								<label className="font-bold mb-2" htmlFor="encaminhar">
									Encaminhar para enfermaria?
								</label>
								<Dropdown
									id={field.name}
									value={field.value}
									optionLabel="name"
									placeholder="Selecione uma opção"
									options={cities}
									focusInputRef={field.ref}
									onChange={(e) => field.onChange(e.value)}
									className={classNames({ 'p-invalid': fieldState.error })}
								/>
							</>
						)}
					/>
					{getFormErrorMessage(errors.encaminhar)}
				</div>
				<div className="col-12 flex flex-column">
					<label className="font-bold" htmlFor="observacao">
						Observação
					</label>
					<InputTextarea
						id="observacao"
						placeholder="Observação"
						className={classNames(
							{
								'p-invalid': errors.observacao,
							},
							'mt-2 w-full'
						)}
						{...register('observacao', {
							required: true,
						})}
					/>
					{getFormErrorMessage(errors.observacao)}
				</div>
				<div className="flex justify-content-end">
					<Button label="continuar" />
				</div>
			</form>
		</div>
	);
};
