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
import { useRef, useState } from 'react';
import { removerFormatacaoDocumento } from '../../../Utils/removerFormatacaoDocumento';

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

	const [idPaciente, setIdPaciente] = useState();

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormData>();

	async function handleChangeCpf(cpf: string) {
		try {
			const response = await api.get(`/pacientes/cpf/${removerFormatacaoDocumento(cpf)}`);

			const {
				id,
				nome,
				sexo,
				dataNascimento,
				profissao
			} = response.data;

			setIdPaciente(id);

			reset({
				nome,
				sexo,
				dataNascimento,
				profissao
			});
		} catch (error) {
			return;
		}
	}

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

			const response = await api.post("/atendimentos/paciente", {
				...data,
				idPaciente
			});
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
				<div className="col-10 flex mt-2">
					<div className="col-3 flex flex-column">
						<label className="font-bold" htmlFor="dataDeNascimento">
							CPF
						</label>

						<InputMask
							className="w-12"
							type="cpf"
							id="cpf"
							placeholder="CPF"
							mask="999.999.999-99"
							slotChar=''
							maxLength={11}
							autoClear={false}
							{...register("cpf", {
								required: true,
								minLength: 11,
								onChange(event) {
									if (event.target.value.length === 14) {
										handleChangeCpf(event.target.value)
									}
								},
							})}
						/>

						<div>
							{errors.cpf && (
								<span className="p-error">Campo obrigatório!</span>
							)}
						</div>
					</div>

					<div className="col-7  flex flex-column">
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
							)}
							aria-describedby="nomeCompleto-help"
							{...register('nome', {
								required: true,
							})}
						/>
						{getFormErrorMessage(errors?.nome)}
					</div>
				</div>

				<div className="col-10 mt-2">
					<div className="flex justify-content-between">
						<div className="col-4 flex flex-column">
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

						<div className="col-3 flex flex-column">
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

						<div className="col-3  flex flex-column">
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

								)}
								{...register('profissao', {
									required: true,
								})}
							/>
							{getFormErrorMessage(errors.profissao)}
						</div>


					</div>
				</div>

				<div className="col-10 flex flex-column mb-2">
					<div className='col-10 flex flex-column mb-2'>
						<label className="font-bold" htmlFor="anamnese">
							Anamnese
						</label>

						<InputTextarea
							id="anamnese"
							placeholder="Anamnese"
							className={classNames(
								{
									'p-invalid': errors.anamnese,
								},
							)}
							{...register('anamnese', {
								required: true,
							})}
						/>
						{getFormErrorMessage(errors.anamnese)}
					</div>
				</div>

				<div className="flex justify-content-end">
					<Button label="Continuar" loading={isSubmitting} />
				</div>
			</form>
		</div>
	);
};
