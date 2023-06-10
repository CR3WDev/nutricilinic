import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../Services/axios';
import { Dropdown } from 'primereact/dropdown';
import { isAxiosError } from 'axios';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const opcoesSexo = [
	{
		codigo: "MASCULINO",
		descricao: "Masculino"
	},
	{
		codigo: "FEMININO",
		descricao: "Feminino"
	}
];

interface FormData {
	nome: string;
	dataNascimento: string;
	sexo: string;
	profissao: string;
	anamnese: string;
	cpf: string;
}

export const DadosPaciente = ({
	setActiveIndex,
	activeIndex,
	setFormData,
	setIdAtendimento
}: any) => {

	const navigate = useNavigate();

	const toast = useRef<any>(null);

	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormData>();

	const getFormErrorMessage = (errors: any) => {
		if (errors?.type === 'required') {
			return <span className="p-error">Campo Obrigatório</span>;
		}
	};
	const onSubmit = async (data: FormData) => {
		try {
			if (activeIndex > 2) return;
			if (activeIndex === 2) return navigate('/pacientes');
			setFormData(data);

			const response = await api.post("/atendimentos/paciente", data);
			setActiveIndex((prev: any) => prev + 1);
			setIdAtendimento(response.data.id);
		} catch (error) {
			const isAppError = isAxiosError(error);
			if (isAppError) {
				let message = `${error.response?.data.detail}`;

				const hasProblemObjects = error.response?.data.problemObjects;
				if (hasProblemObjects) {
					message = `${error.response?.data.problemObjects.map((problemObject: any) => problemObject.userMessage + "\n")}`;
				}

				toast.current?.show({ severity: 'error', summary: 'Erro', detail: message });

			}
		}
	};

	return (
		<div>
			<Toast ref={toast} />

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex">
					<div className="col-6 flex flex-column">
						<label className="font-bold" htmlFor="nomeCompleto">
							Nome Completo
						</label>
						<InputText
							placeholder="Nome Completo"
							id="nomeCompleto"
							className={classNames(
								{
									'p-invalid': errors.nome,
								},
								'mt-2'
							)}
							aria-describedby="nomeCompleto-help"
							{...register('nome', {
								required: true,
							})}
						/>
						{getFormErrorMessage(errors?.nome)}
					</div>
					<div className="col-6 flex flex-column">
						<label className="font-bold" htmlFor="profissao">
							Profissão
						</label>
						<InputText
							placeholder="Profissão"
							id="profissao"
							className={classNames(
								{
									'p-invalid': errors.profissao,
								},
								'mt-2'
							)}
							{...register('profissao', {
								required: true,
							})}
						/>
						{getFormErrorMessage(errors.profissao)}
					</div>
				</div>
				<div className="col-10 mt-2">
					<div className="flex justify-content-between">
						<div className="col-4 m-0 p-0 flex flex-column">
							<label className="font-bold" htmlFor="dataDeNascimento">
								Data de Nascimento
							</label>
							<InputMask
								className={classNames(
									{
										'p-invalid': errors.dataNascimento,
									}
								)}
								{...register('dataNascimento', {
									required: true,
								})}
								placeholder="Data de Nascimento"
								id="dataDeNascimento"
								mask="99/99/9999"
								keyfilter={/^[0-9]*$/}
							/>
							{getFormErrorMessage(errors.dataNascimento)}
						</div>

						<div className="col-3 m-0 p-0 flex flex-column">
							<label className="font-bold" htmlFor="sexo">
								Sexo
							</label>

							<Controller
								name="sexo"
								control={control}
								rules={{ required: 'Sexo é obrigatório.' }}
								render={({ field }) => (
									<Dropdown
										value={field.value}
										optionLabel="descricao"
										optionValue='codigo'
										placeholder="Sexo"
										options={opcoesSexo}
										focusInputRef={field.ref}
										onChange={(e) => field.onChange(e.value)}
										className="w-full md:w-14rem"
									/>
								)}
							/>

							{getFormErrorMessage(errors.sexo)}
						</div>

						<div className="col-3 m-0 p-0 flex flex-column">

							<label className="font-bold" htmlFor="dataDeNascimento">
								CPF
							</label>

							<InputMask
								className="mb-2 w-12"
								type="cpf"
								id="cpf"
								placeholder="CPF"
								mask="999.999.999-99"
								maxLength={11}
								{...register("cpf", {
									required: true,
									minLength: 11,
								})}
							/>

							<div>
								{errors.cpf && (
									<span className="p-error">Campo obrigatório!</span>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="col-12">
					<label className="font-bold mb-2" htmlFor="anamnese">
						Anamnese
					</label>

					<InputTextarea
						id="anamnese"
						placeholder="Anamnese"
						className={classNames(
							{
								'p-invalid': errors.anamnese,
							},
							'mt-2 w-full'
						)}
						{...register('anamnese', {
							required: true,
						})}
					/>
					{getFormErrorMessage(errors.anamnese)}
				</div>
				<div className="flex justify-content-end">
					<Button label="Continuar" loading={isSubmitting} />
				</div>
			</form>
		</div>
	);
};
