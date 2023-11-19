import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { api } from '../../../../Services/axios';
import { AlimentoRefeicaoProps } from '../../PlanoAlimentar';

interface AlimentoProps {
	id: number;
	descricao: string;
};

interface MedidaProps {
	id: number;
	descricao: string;
	descricaoApresentacao: string;
}

interface FormData {
	alimento: AlimentoProps,
	medida: MedidaProps,
	quantidade: number;
}

interface AlimentoModalProps {
	addAlimento: (alimento: AlimentoRefeicaoProps) => void;
	onHide: () => void;

}

export const AlimentoModal = ({
	addAlimento,
	onHide,
	// alimentoSelected, 
}: AlimentoModalProps) => {

	const [alimentosAutocomplete, setAlimentosAutocomplete] = useState<AlimentoProps[]>([]);

	const [medidas, setMedidas] = useState<MedidaProps[]>([]);

	const {
		formState: { errors },
		// setValue,
		handleSubmit,
		// watch,
		control,
	} = useForm<FormData>();

	// useEffect(() => {
	// 	if (!alimentoSelected) return;
	// 	setValue('alimento', alimentoSelected?.alimento);
	// 	setValue('quantidade', alimentoSelected?.quantidade);
	// }, [alimentoSelected]);

	const getFormErrorMessage = (errors: any) => {
		if (errors?.type === 'required') {
			return <span className="p-error">Campo Obrigatório</span>;
		}
	};
	const getAlimento = async (descricao: string) => {
		const response = await api.get(`/alimentos?descricao=${descricao}`);
		setAlimentosAutocomplete(response.data);
	};
	const getMedidas = async () => {
		const response = await api.get('/medidas');
		setMedidas(response.data);
	};

	const onSubmit = (data: FormData) => {
		const novoAlimento = {
			descricao: data.alimento.descricao,
			descricaoMedida: data.medida.descricaoApresentacao,
			idAlimento: data.alimento.id,
			quantidade: data.quantidade,
			idMedida: data.medida.id
		};

		addAlimento(novoAlimento);

		onHide();
	};

	useEffect(() => {
		getMedidas();
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-row gap-4">
				<div className="flex flex-column">
					<label className="font-bold">Alimento</label>

					<Controller
						name="alimento"
						control={control}
						rules={{ required: 'Alimento é Obrigatório' }}
						render={({ field }) => (
							<AutoComplete
								field='descricao'
								inputId={field.name}
								value={field.value}
								placeholder="Alimento"
								suggestions={alimentosAutocomplete}
								onChange={field.onChange}
								inputRef={field.ref}
								completeMethod={(e) => {
									if (e.query.length >= 3) getAlimento(e.query);
								}}
								className={classNames(
									{
										'p-invalid': errors.alimento,
									},
								)}
								aria-describedby="nomeCompleto-help"
							/>
						)}
					/>
					{getFormErrorMessage(errors?.alimento)}
				</div>

				<div className="flex flex-column">
					<label className="font-bold">Quantidade</label>

					<Controller
						name="quantidade"
						control={control}
						rules={{ required: 'Campo é obrigatório' }}
						render={({ field }) => (
							<InputNumber
								id={field.name}
								inputRef={field.ref}
								value={field.value}
								onChange={(e) => field.onChange(e.value)}
								locale="pt-BR"
								minFractionDigits={2}
								placeholder="Quantidade"
								className={classNames(
									{
										'p-invalid': errors.quantidade,
									},
								)}
							/>
						)}
					/>
					{getFormErrorMessage(errors?.quantidade)}
				</div>

				<div className="flex flex-column">
					<label className="font-bold">Medida</label>

					<Controller
						name="medida"
						control={control}
						rules={{ required: 'Campo Obrigatório' }}
						render={({ field }) => (
							<Dropdown
								id={field.name}
								value={field.value}
								optionLabel="descricao"
								placeholder="Selecione uma medida"
								options={medidas}
								className={classNames(
									{
										'p-invalid': errors.medida,
									},
								)}
								focusInputRef={field.ref}
								onChange={(e) => field.onChange(e.value)}
							/>
						)}
					/>
					{getFormErrorMessage(errors?.medida)}
				</div>
			</div>

			<div className="flex justify-content-end">
				<Button
					type="button"
					text
					className="mt-3"
					onClick={() => {
						onHide();
						// setAlimentoSelected(undefined);
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
