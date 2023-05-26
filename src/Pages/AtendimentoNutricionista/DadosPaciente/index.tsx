import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../Services/axios';
import { Dropdown } from 'primereact/dropdown';

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
}

export const DadosPaciente = ({
	setActiveIndex,
	activeIndex,
	setFormData,
	setIdAtendimento
}: any) => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const getFormErrorMessage = (errors: any) => {
		if (errors?.type === 'required') {
			return <span className="p-error">Campo Obrigatório</span>;
		}
	};
	const onSubmit = async (data: FormData) => {
		if (activeIndex > 2) return;
		if (activeIndex === 2) return navigate('/pacientes');
		setFormData(data);

		const response = await api.post("/atendimentos/paciente", data);
		setActiveIndex((prev: any) => prev + 1);
		setIdAtendimento(response.data.id);
	};
	return (
		<div>
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
				<div className="col-6">
					<div className="flex justify-content-between">
						<div className="col-5 m-0 p-0 flex flex-column">
							<label className="font-bold" htmlFor="dataDeNascimento">
								Data de Nascimento
							</label>
							<InputMask
								className={classNames(
									{
										'p-invalid': errors.dataNascimento,
									},
									'mt-2'
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

						{/* <div className="col-5 m-0 p-0 flex flex-column">
							<label className="font-bold" htmlFor="dataDeNascimento">
								Sexo
							</label>

							<Dropdown
								options={opcoesSexo}
								optionLabel="descricao"
								optionValue="codigo"
								placeholder="Sexo"
								className="w-full md:w-14rem"
								{...register('sexo', {
									required: true,
								})}
							/>

							{getFormErrorMessage(errors.sexo)}
						</div> */}
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
					<Button label="continuar" />
				</div>
			</form>
		</div>
	);
};
