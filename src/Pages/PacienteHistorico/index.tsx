import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IPaciente } from '../../Models/pacientes';
import { setMode } from '../../Redux/mode';
import { api } from '../../Services/axios';
import { Dialog } from 'primereact/dialog';
import { InputMask } from 'primereact/inputmask';
import addMinutes from 'date-fns/addMinutes'

import { format, isBefore, isEqual, setHours, setMinutes, setSeconds } from 'date-fns';

import { Chip } from 'primereact/chip';


export const PacientesHistorico = () => {
	const [historico, setHistorico] = useState([]);
	const [paciente, setPaciente] = useState<IPaciente>();
	const navigate = useNavigate();
	const { id, local } = useParams();

	const [configurarNotificacoesVisible, setConfigurarNotificacoesVisible] = useState(false);
	const [alertHidratacaoInicio, setAlertaHidratacaoInicio] = useState("");
	const [alertHidratacaoFim, setAlertaHidratacaoFim] = useState("");
	const [intervaloHidratacao, setIntervaloHidratacao] = useState("");
	const [horariosHidratacao, setHorariosHidratacao] = useState<string[]>([]);

	const dispatch = useDispatch();

	const actionsColumns = (usuario: any) => {
		return (
			<div style={{ display: 'flex', width: '70px' }}>
				<Button
					icon="pi pi-search"
					style={{ height: '20px' }}
					className=" p-button-text mr-2"
					onClick={() => console.log('oi')}
				/>
			</div>
		);
	};

	async function buscarHistorico() {
		const response = await api.get(`/nutricionista/pacientes/${id}/historico`);
		setHistorico(response.data);
	}

	const buscarPaciente = async () => {
		const response = await api.get(`/pacientes/${id}`);
		setPaciente(response.data);
	};

	function handleConfigurarNotificacoes() {
		setConfigurarNotificacoesVisible(true);
		setHorariosHidratacao([]);
		setAlertaHidratacaoInicio("");
		setAlertaHidratacaoFim("");
		setIntervaloHidratacao("");

		// Buscar configuração salva de horário
	}

	function handleConfirmarAlertaHidratacao() {

		const horarioInicio = alertHidratacaoInicio.split(":");

		let dataAtualInicio = setHours(new Date(), Number(horarioInicio[0]));
		dataAtualInicio = setMinutes(dataAtualInicio, Number(horarioInicio[1]));
		dataAtualInicio = setSeconds(dataAtualInicio, 0);

		const horarioFim = alertHidratacaoFim.split(":");
		let dataAtualFim = setHours(new Date(), Number(horarioFim[0]));
		dataAtualFim = setMinutes(dataAtualFim, Number(horarioFim[1]));
		dataAtualFim = setSeconds(dataAtualFim, 0);

		let horarios = [alertHidratacaoInicio];

		let proximoHorario = addMinutes(dataAtualInicio, Number(intervaloHidratacao));

		while (isBefore(proximoHorario, dataAtualFim) || isEqual(proximoHorario, dataAtualFim)) {
			horarios.push(format(proximoHorario, "HH:mm"));
			proximoHorario = addMinutes(proximoHorario, Number(intervaloHidratacao));
		}

		setHorariosHidratacao(horarios);
	}

	async function handleConfirmarHorariosAlerta() {

	}

	useEffect(() => {
		buscarPaciente();
		buscarHistorico();
	}, []);

	return (
		<section>
			<h1>Histórico do paciente</h1>
			<Card className="mt-3">
				<div className="h-full flex align-items-center w-full">
					<Avatar
						className="mr-2"
						icon="pi pi-user"
						size="xlarge"
						shape="circle"
					/>
					<div className="my-3">
						<div>
							<span className="font-bold">{paciente?.nome}</span>
						</div>
						<div>
							<span>{paciente?.idade}</span> anos
							<span> {paciente?.sexo}</span>
						</div>
						<div>
							Pontuário:<span> {paciente?.id}</span>
						</div>
					</div>
				</div>

				<div>
					<Button
						label='Notificar'
						icon="pi pi-bell"
						iconPos="right"
						onClick={handleConfigurarNotificacoes}
					/>
				</div>

				<Divider />

				<DataTable
					value={historico}
					scrollable
					scrollHeight="400px"
					emptyMessage="Paciente não possui histórico"
				>
					<Column field="dataExtenso" header="Data"></Column>
					<Column field="descricaoOcorrencia" header="Registro"></Column>
					<Column field="usuarioOcorrencia" header="Doutor(a)"></Column>
					<Column
						body={(data) => actionsColumns(data)}
						header={'ações'}
						className="py-2"
					/>
				</DataTable>
				<div className="flex justify-content-end mt-3">
					<Button
						text
						onClick={() => {
							if (local === 'menu') navigate('/main');
							if (local === 'paciente') navigate('/pacientes');
							dispatch(setMode('search'));
						}}
					>
						Voltar
					</Button>
				</div>
			</Card>

			<Dialog
				header="Alerta de hidratação"
				visible={configurarNotificacoesVisible}
				style={{ width: '50vw' }}
				onHide={() => setConfigurarNotificacoesVisible(false)}
			>

				<div className="flex gap-2">
					<InputMask
						className="w-2"
						mask='99:99'
						placeholder='Início'
						value={alertHidratacaoInicio}
						onChange={e => setAlertaHidratacaoInicio(e.target.value ?? "")}
					/>

					<InputMask
						className="w-2"
						mask='99:99'
						placeholder='Fim'
						value={alertHidratacaoFim}
						onChange={(e) => setAlertaHidratacaoFim(e.target.value ?? "")}
					/>

					<InputMask
						className="w-4"
						mask='99'
						placeholder='Intervalo(min)'
						value={intervaloHidratacao}
						onChange={(e) => setIntervaloHidratacao(e.target.value ?? "")}
					/>

					<Button label='Ok' onClick={handleConfirmarAlertaHidratacao} />
				</div>

				{horariosHidratacao.length > 0 ? (
					<>
						<div className="flex mt-2 gap-2 flex-wrap">
							{horariosHidratacao.map(horario => <Chip key={horario} label={horario} />)}
						</div>

						<Button label='Confirmar' onClick={handleConfirmarHorariosAlerta} className='mt-4' /></>
				) : null}
			</Dialog>
		</section>
	);
};
