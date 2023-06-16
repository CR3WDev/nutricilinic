import { Route, Routes } from 'react-router-dom';
import { Acompanhamento } from '../../Pages/Acompanhamento';
import { AgendamentosPage } from '../../Pages/Agendamentos';
import { AtendimentoNutricionista } from '../../Pages/AtendimentoNutricionista';
import { MainPage } from '../../Pages/Main';
import { PacientesHistorico } from '../../Pages/PacienteHistorico';
import { PacientesMenu } from '../../Pages/Pacientes/menu';
import { UsuariosPage } from '../../Pages/Usuarios';

export const InternalRoutes = () => {
	return (
		<Routes>
			<Route path="/main" element={<MainPage />} />
			<Route path="/agendamentos" element={<AgendamentosPage />} />
			<Route path="/pacientes" element={<PacientesMenu />} />
			<Route path="/usuarios" element={<UsuariosPage />} />
			<Route path="/acompanhamento" element={<Acompanhamento />} />
			<Route
				path="/atendimento-nutricionista"
				element={<AtendimentoNutricionista />}
			/>
			<Route
				path="/paciente-historico/:id/:local"
				element={<PacientesHistorico />}
			/>
		</Routes>
	);
};
