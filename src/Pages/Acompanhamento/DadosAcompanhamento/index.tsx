import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { cities } from '../../../Utils/mock/cities';

export const DadosAcompanhamento = ({
	setActiveIndex,
	activeIndex,
	setFormData,
}: any) => {
	const navigate = useNavigate();

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
		if (activeIndex > 2) return;
		if (activeIndex === 2) return navigate('/pacientes');
		setActiveIndex((prev: any) => prev + 1);
		setFormData(data);
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
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
				<div className="col-6 flex flex-column">
					<Controller
						name="encaminhamento"
						control={control}
						rules={{ required: true }}
						render={({ field, fieldState }) => (
							<>
								<label className="font-bold mb-2" htmlFor="encaminhamento">
									Encaminhamento:
								</label>
								<Dropdown
									id={field.name}
									value={field.value}
									optionLabel="name"
									placeholder="Selecionar encaminhamento"
									options={cities}
									focusInputRef={field.ref}
									onChange={(e) => field.onChange(e.value)}
									className={classNames({ 'p-invalid': fieldState.error })}
								/>
							</>
						)}
					/>
					{getFormErrorMessage(errors.encaminhamento)}
				</div>
				<div className="flex justify-content-end">
					<Button label="continuar" />
				</div>
			</form>
		</div>
	);
};
