import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { classNames } from 'primereact/utils';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const AvaliacaoFisica = ({ setFormData, setActiveIndex }: any) => {
	const {
		formState: { errors },
		register,
		control,
		setValue,
		handleSubmit,
	} = useForm();

	const getFormErrorMessage = (errors: any) => {
		if (errors?.type === 'required') {
			return <span className="p-error">Campo Obrigatório</span>;
		}
	};
	const onSubmit = (data: any) => {
		setFormData(data);
		setActiveIndex((prev: number) => prev + 1);
	};
	useEffect(() => {
		setValue('tipo', 'pregasCutaneas');
	}, []);
	return (
		<div>
			<form action="" onSubmit={handleSubmit(onSubmit)}>
				<Fieldset>
					<div className="flex">
						<div className="col-6 flex flex-column">
							<label className="font-bold" htmlFor="altura">
								Altura
							</label>
							<InputText
								placeholder="Altura"
								id="altura"
								className={classNames(
									{
										'p-invalid': errors.altura,
									},
									'mt-2'
								)}
								{...register('altura', {})}
							/>
							{getFormErrorMessage(errors.altura)}
						</div>
						<div className="col-6 flex flex-column">
							<label className="font-bold" htmlFor="peso">
								Peso
							</label>
							<InputText
								placeholder="Peso"
								id="peso"
								className={classNames(
									{
										'p-invalid': errors.peso,
									},
									'mt-2'
								)}
								{...register('peso', {})}
							/>
							{getFormErrorMessage(errors.peso)}
						</div>
					</div>
				</Fieldset>
				<Fieldset className="mt-3" legend={'Circunferências'}>
					<div className="flex">
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="bracoEsquerdoRelaxado">
								Braço Esquerdo Relaxado
							</label>
							<InputText
								placeholder="Braço Esquerdo Relaxado"
								id="bracoEsquerdoRelaxado"
								className={classNames(
									{
										'p-invalid': errors.bracoEsquerdoRelaxado,
									},
									'mt-2'
								)}
								{...register('bracoEsquerdoRelaxado', {})}
							/>
							{getFormErrorMessage(errors.bracoEsquerdoRelaxado)}
						</div>
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="bracoDireitoRelaxado">
								Braço Direito Relaxado
							</label>
							<InputText
								placeholder="Braço Direito Relaxado"
								id="bracoDireitoRelaxado"
								className={classNames(
									{
										'p-invalid': errors.bracoDireitoRelaxado,
									},
									'mt-2'
								)}
								{...register('bracoDireitoRelaxado', {})}
							/>
							{getFormErrorMessage(errors.bracoDireitoRelaxado)}
						</div>
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="bracoEsquerdoContraido">
								Braço Esquerdo Contraído
							</label>
							<InputText
								placeholder="Braço Esquerdo Contraído"
								id="bracoEsquerdoContraido"
								className={classNames(
									{
										'p-invalid': errors.bracoEsquerdoContraido,
									},
									'mt-2'
								)}
								{...register('bracoEsquerdoContraido', {})}
							/>
							{getFormErrorMessage(errors.bracoEsquerdoContraido)}
						</div>
					</div>
					<div className="flex">
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="bracoDireitoContraido">
								Braço Direto Contraído
							</label>
							<InputText
								placeholder="Braço Direto Contraído"
								id="bracoDireitoContraido"
								className={classNames(
									{
										'p-invalid': errors.bracoDireitoContraido,
									},
									'mt-2'
								)}
								{...register('bracoDireitoContraido', {})}
							/>
							{getFormErrorMessage(errors.bracoDireitoContraido)}
						</div>
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="antebracoEsquerdo">
								Antebraço Esquerdo
							</label>
							<InputText
								placeholder="Antebraço Esquerdo"
								id="antebracoEsquerdo"
								className={classNames(
									{
										'p-invalid': errors.antebracoEsquerdo,
									},
									'mt-2'
								)}
								{...register('antebracoEsquerdo', {})}
							/>
							{getFormErrorMessage(errors.antebracoEsquerdo)}
						</div>
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="antebracoDireito">
								Antebraco Direito
							</label>
							<InputText
								placeholder="Antebraco Direito"
								id="bracoEsquerdoContraido"
								className={classNames(
									{
										'p-invalid': errors.antebracoDireito,
									},
									'mt-2'
								)}
								{...register('antebracoDireito', {})}
							/>
							{getFormErrorMessage(errors.antebracoDireito)}
						</div>
					</div>
					<div className="flex">
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="punhoEsquerdo">
								Punho Esquerdo
							</label>
							<InputText
								placeholder="Punho Esquerdo"
								id="punhoEsquerdo"
								className={classNames(
									{
										'p-invalid': errors.punhoEsquerdo,
									},
									'mt-2'
								)}
								{...register('punhoEsquerdo', {})}
							/>
							{getFormErrorMessage(errors.punhoEsquerdo)}
						</div>
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="punhoDireito">
								Punho Direito
							</label>
							<InputText
								placeholder="Punho Direito"
								id="punhoDireito"
								className={classNames(
									{
										'p-invalid': errors.punhoDireito,
									},
									'mt-2'
								)}
								{...register('punhoDireito', {})}
							/>
							{getFormErrorMessage(errors.punhoDireito)}
						</div>
					</div>
				</Fieldset>
				<Fieldset className="my-3" legend={'Composição Corporal'}>
					<div className="flex">
						<div className="col-6">
							<Controller
								name="tipo"
								control={control}
								render={({ field }) => (
									<>
										<div className="flex justify-content-between h-full align-items-center">
											<div>
												<RadioButton
													inputId="f5"
													{...field}
													inputRef={field.ref}
													value="pregasCutaneas"
													checked={field.value === 'pregasCutaneas'}
												/>
												<label htmlFor="f5" className="ml-1 mr-3">
													Pregas Cutâneas
												</label>
											</div>
											<div>
												<RadioButton
													inputId="f6"
													{...field}
													value="biompedância"
													checked={field.value === 'biompedância'}
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
								id="protocolo"
								className={classNames(
									{
										'p-invalid': errors.protocolo,
									},
									'mt-2'
								)}
								{...register('protocolo', {})}
							/>
							{getFormErrorMessage(errors.protocolo)}
						</div>
					</div>
					<div className="flex">
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="biceps">
								Bíceps
							</label>
							<InputText
								placeholder="Bíceps"
								id="biceps"
								className={classNames(
									{
										'p-invalid': errors.biceps,
									},
									'mt-2'
								)}
								{...register('biceps', {})}
							/>
							{getFormErrorMessage(errors.biceps)}
						</div>
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="abdominal">
								Abdominal
							</label>
							<InputText
								placeholder="Abdominal"
								id="abdominal"
								className={classNames(
									{
										'p-invalid': errors.abdominal,
									},
									'mt-2'
								)}
								{...register('abdominal', {})}
							/>
							{getFormErrorMessage(errors.abdominal)}
						</div>
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="triceps">
								Tríceps
							</label>
							<InputText
								placeholder="Tríceps"
								id="triceps"
								className={classNames(
									{
										'p-invalid': errors.triceps,
									},
									'mt-2'
								)}
								{...register('triceps', {})}
							/>
							{getFormErrorMessage(errors.triceps)}
						</div>
					</div>
					<div className="flex">
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="suprailíaca">
								Suprailíaca
							</label>
							<InputText
								placeholder="Suprailíaca"
								id="suprailíaca"
								className={classNames(
									{
										'p-invalid': errors.suprailíaca,
									},
									'mt-2'
								)}
								{...register('suprailíaca', {})}
							/>
							{getFormErrorMessage(errors.suprailíaca)}
						</div>
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="axiliarMedia">
								Axiliar Média
							</label>
							<InputText
								placeholder="Axiliar Média"
								id="axiliarMedia"
								className={classNames(
									{
										'p-invalid': errors.axiliarMedia,
									},
									'mt-2'
								)}
								{...register('axiliarMedia', {})}
							/>
							{getFormErrorMessage(errors.axiliarMedia)}
						</div>
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="subscapular">
								Subscapular
							</label>
							<InputText
								placeholder="Subscapular"
								id="subscapular"
								className={classNames(
									{
										'p-invalid': errors.subscapular,
									},
									'mt-2'
								)}
								{...register('subscapular', {})}
							/>
							{getFormErrorMessage(errors.subscapular)}
						</div>
					</div>
					<div className="flex">
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="torax">
								Torax
							</label>
							<InputText
								placeholder="Torax"
								id="torax"
								className={classNames(
									{
										'p-invalid': errors.torax,
									},
									'mt-2'
								)}
								{...register('torax', {})}
							/>
							{getFormErrorMessage(errors.torax)}
						</div>
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="Coxa">
								Coxa
							</label>
							<InputText
								placeholder="Coxa"
								id="coxa"
								className={classNames(
									{
										'p-invalid': errors.coxa,
									},
									'mt-2'
								)}
								{...register('coxa', {})}
							/>
							{getFormErrorMessage(errors.coxa)}
						</div>
						<div className="col-4 flex flex-column">
							<label className="font-bold" htmlFor="panturrilhaMedial">
								Panturrilha Medial
							</label>
							<InputText
								placeholder="Panturrilha Medial"
								id="panturrilhaMedial"
								className={classNames(
									{
										'p-invalid': errors.panturrilhaMedial,
									},
									'mt-2'
								)}
								{...register('panturrilhaMedial', {})}
							/>
							{getFormErrorMessage(errors.panturrilhaMedial)}
						</div>
					</div>
				</Fieldset>
				<div className="flex justify-content-end">
					<Button label="continuar" />
				</div>
			</form>
		</div>
	);
};
