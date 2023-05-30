import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const EditAlimento = ({
	onHide,
	alimentoSelected,
	setAlimentoSelected,
}: any) => {
	const {
		formState: { errors },
		register,
		setValue,
		handleSubmit,
		reset,
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
	const onSubmit = (data: any) => {
		console.log(data);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex">
				<div className="col-6 flex flex-column">
					<label className="font-bold">Alimento</label>
					<InputText
						placeholder="alimento"
						id="alimento"
						className={classNames(
							{
								'p-invalid': errors.alimento,
							},
							'mt-2'
						)}
						aria-describedby="nomeCompleto-help"
						{...register('alimento', {
							required: true,
						})}
					></InputText>
					{getFormErrorMessage(errors?.alimento)}
				</div>
				<div className="col-6 flex flex-column">
					<label className="font-bold">Quantidade</label>
					<InputText
						placeholder="Quantidade"
						id="quantidade"
						className={classNames(
							{
								'p-invalid': errors.quantidade,
							},
							'mt-2'
						)}
						aria-describedby="nomeCompleto-help"
						{...register('quantidade', {
							required: true,
						})}
					></InputText>
					{getFormErrorMessage(errors?.quantidade)}
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
				<Button
					text
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
	);
};
