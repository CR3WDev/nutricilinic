import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import { classNames } from 'primereact/utils';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { api } from '../../../Services/axios';

interface FormData {
	altura: number;
	peso: number;
	bracoEsquerdoRelaxado: number;
	bracoDireitoRelaxado: number;
	bracoEsquerdoContraido: number;
	bracoDireitoContraido: number;
	antebracoDireito: number;
	antebracoEsquerdo: number;
	punhoDireito: number;
	punhoEsquerdo: number;
	tipoComposicaoCorporal: string;
	protocolo: string;
	biceps: number;
	abdominal: number;
	triceps: number;
	suprailiaca: number;
	axilarMedia: number;
	subscapular: number;
	torax: number;
	coxa: number;
	panturrilhaMedial: number;
}

export const AvaliacaoFisica = ({ setActiveIndex, idAtendimento, setResultadoAvalicao }: any) => {
	const {
		formState: { errors, isLoading },
		register,
		control,
		setValue,
		handleSubmit,
		reset
	} = useForm<FormData>();

	const getFormErrorMessage = (errors: any) => {
		if (errors?.type === 'required') {
			return <span className="p-error">Campo Obrigatório</span>;
		}
	};
	const onSubmit = async (data: FormData) => {
		const response = await api.post(`/atendimentos/${idAtendimento}/avaliacao-fisica`, data);
		setActiveIndex((prev: any) => prev + 1);
		setResultadoAvalicao(response.data.resultados);
	};

	async function buscarAvaliacaoFisicaExistente(idAtendimento: number) {
		try {
			const response = await api.get(`/atendimentos/${idAtendimento}/avaliacao-fisica`);
			const { data } = response;
			reset(data);
		} catch (error) {
			console.log(error);
			return;
		}
	}

	useEffect(() => {
		setValue('tipoComposicaoCorporal', 'PREGAS_CUTANEAS');
	}, []);


	useEffect(() => {
		if (idAtendimento) {
			buscarAvaliacaoFisicaExistente(idAtendimento);
		}
	}, [idAtendimento]);

	console.log(idAtendimento)

	return (
		<div>
			<form action="" onSubmit={handleSubmit(onSubmit)}>
				<Fieldset>
					<div className="flex">
						<div className="col-6 flex flex-column">
							<label className="font-bold" htmlFor="altura">
								Altura(m)
							</label>
							<Controller
								name="altura"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Altura"
										id="altura"
										className={classNames(
											{
												'p-invalid': errors.altura,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.altura)}
						</div>

						<div className="col-6 flex flex-column">
							<label className="font-bold" htmlFor="peso">
								Peso(Kg)
							</label>
							<Controller
								name="peso"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Peso"
										id="peso"
										className={classNames(
											{
												'p-invalid': errors.peso,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.peso)}
						</div>
					</div>
				</Fieldset>

				<Fieldset className="mt-3" legend={'Circunferências'}>
					<div className="flex">
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="bracoEsquerdoRelaxado">
								Braço Esquerdo Relaxado(cm)
							</label>

							<Controller
								name="bracoEsquerdoRelaxado"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Braço Esquerdo Relaxado"
										id="bracoEsquerdoRelaxado"
										className={classNames(
											{
												'p-invalid': errors.bracoEsquerdoRelaxado,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.bracoEsquerdoRelaxado)}
						</div>

						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="bracoDireitoRelaxado">
								Braço Direito Relaxado(cm)
							</label>

							<Controller
								name="bracoDireitoRelaxado"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Braço Direito Relaxado"
										id="bracoDireitoRelaxado"
										className={classNames(
											{
												'p-invalid': errors.bracoDireitoRelaxado,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.bracoDireitoRelaxado)}
						</div>
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="bracoEsquerdoContraido">
								Braço Esquerdo Contraído(cm)
							</label>
							<Controller
								name="bracoEsquerdoContraido"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Braço Esquerdo contraído"
										id="bracoEsquerdoContraido"
										className={classNames(
											{
												'p-invalid': errors.bracoEsquerdoContraido,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.bracoEsquerdoContraido)}
						</div>
					</div>
					<div className="flex">
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="bracoDireitoContraido">
								Braço Direto Contraído(cm)
							</label>

							<Controller
								name="bracoDireitoContraido"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Braço Direito contraído"
										id="bracoEsquerdoContraido"
										className={classNames(
											{
												'p-invalid': errors.bracoDireitoContraido,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.bracoDireitoContraido)}
						</div>

						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="antebracoEsquerdo">
								Antebraço Esquerdo(cm)
							</label>

							<Controller
								name="antebracoEsquerdo"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Antebraço esquerdo"
										id="antebracoEsquerdo"
										className={classNames(
											{
												'p-invalid': errors.antebracoEsquerdo,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.antebracoEsquerdo)}
						</div>

						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="antebracoDireito">
								Antebraco Direito(cm)
							</label>

							<Controller
								name="antebracoDireito"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Antebraço direito"
										id="antebracoDireito"
										className={classNames(
											{
												'p-invalid': errors.antebracoDireito,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.antebracoDireito)}
						</div>
					</div>
					<div className="flex">
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="punhoEsquerdo">
								Punho Esquerdo(cm)
							</label>

							<Controller
								name="punhoEsquerdo"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Punho esquerdo"
										id="punhoEsquerdo"
										className={classNames(
											{
												'p-invalid': errors.punhoEsquerdo,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.punhoEsquerdo)}
						</div>

						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="punhoDireito">
								Punho Direito(cm)
							</label>

							<Controller
								name="punhoDireito"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Punho direito"
										id="punhoDireito"
										className={classNames(
											{
												'p-invalid': errors.punhoDireito,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.punhoDireito)}
						</div>
					</div>
				</Fieldset>
				<Fieldset className="my-3" legend={'Composição Corporal'}>
					<div className="flex">
						<div className="col-6">
							<Controller
								name="tipoComposicaoCorporal"
								control={control}
								render={({ field }) => (
									<>
										<div className="flex justify-content-between h-full align-items-center">
											<div>
												<RadioButton
													inputId="f5"
													{...field}
													inputRef={field.ref}
													value="PREGAS_CUTANEAS"
													checked={field.value === 'PREGAS_CUTANEAS'}
												/>
												<label htmlFor="f5" className="ml-1 mr-3">
													Pregas Cutâneas
												</label>
											</div>
											<div>
												<RadioButton
													inputId="f6"
													{...field}
													value="BIOIMPEDANCIA"
													checked={field.value === 'BIOIMPEDANCIA'}
													disabled
												/>
												<label htmlFor="f6" className="ml-1 mr-3">
													Biompedância
												</label>
											</div>
										</div>
									</>
								)}
							/>
						</div>
						<div className="col-6 flex flex-column">
							<label className="font-bold" htmlFor="protocolo">
								Protocolo
							</label>

							<InputText
								placeholder="Protocolo"
								value='4 pregas Falkner'
								disabled
							/>

							<InputText
								hidden
								placeholder="Protocolo"
								id="protocolo"
								className={classNames(
									{
										'p-invalid': errors.protocolo,
									},
									'mt-2'
								)}
								{...register('protocolo', {})}
								value='QUATRO_PREGAS_FAULKNER'
							/>
							{getFormErrorMessage(errors.protocolo)}
						</div>
					</div>
					<div className="flex">
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="biceps">
								Bíceps
							</label>

							<Controller
								name="biceps"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Bíceps"
										id="biceps"
										className={classNames(
											{
												'p-invalid': errors.biceps,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.biceps)}
						</div>

						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="abdominal">
								Abdominal
							</label>

							<Controller
								name="abdominal"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Abnominal"
										id="abdominal"
										className={classNames(
											{
												'p-invalid': errors.abdominal,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.abdominal)}
						</div>

						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="triceps">
								Tríceps
							</label>

							<Controller
								name="triceps"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Tríceps"
										id="triceps"
										className={classNames(
											{
												'p-invalid': errors.triceps,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.triceps)}
						</div>
					</div>
					<div className="flex">
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="suprailíaca">
								Suprailíaca
							</label>

							<Controller
								name="suprailiaca"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Suprailíaca"
										id="triceps"
										className={classNames(
											{
												'p-invalid': errors.suprailiaca,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.suprailiaca)}
						</div>

						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="axiliarMedia">
								Axilar Média
							</label>

							<Controller
								name="axilarMedia"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Axilar média"
										id="triceps"
										className={classNames(
											{
												'p-invalid': errors.axilarMedia,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.axilarMedia)}
						</div>

						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="subscapular">
								Subscapular
							</label>

							<Controller
								name="subscapular"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Subscapular"
										id="subscapular"
										className={classNames(
											{
												'p-invalid': errors.subscapular,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.subscapular)}
						</div>
					</div>

					<div className="flex">
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="torax">
								Torax
							</label>

							<Controller
								name="torax"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Tórax"
										id="torax"
										className={classNames(
											{
												'p-invalid': errors.torax,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.torax)}
						</div>

						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="Coxa">
								Coxa
							</label>

							<Controller
								name="coxa"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Coxa"
										id="coxa"
										className={classNames(
											{
												'p-invalid': errors.coxa,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.coxa)}
						</div>

						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="panturrilhaMedial">
								Panturrilha Medial
							</label>

							<Controller
								name="panturrilhaMedial"
								control={control}
								rules={{ required: "Campo é obrigatório" }}
								render={({ field }) => (
									<InputNumber
										onValueChange={(e) => field.onChange(e)}
										value={field.value}
										locale='pt-BR'
										minFractionDigits={2}
										placeholder="Panturrilha medial"
										id="torax"
										className={classNames(
											{
												'p-invalid': errors.panturrilhaMedial,
											},
											'mt-2'
										)}
									/>
								)}
							/>
							{getFormErrorMessage(errors.panturrilhaMedial)}
						</div>
					</div>
				</Fieldset>
				<div className="flex justify-content-end">
					<Button label="Continuar" loading={isLoading} />
				</div>
			</form>
		</div>
	);
};
