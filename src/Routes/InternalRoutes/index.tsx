import { Route, Routes, useNavigate } from 'react-router-dom';
import { Acompanhamento } from '../../Pages/Acompanhamento';
import { AgendamentosPage } from '../../Pages/Agendamentos';
import { AtendimentoNutricionista } from '../../Pages/AtendimentoNutricionista';
import { AtendimentoNutrologo } from '../../Pages/AtendimentoNutrologo';
import { MainPage } from '../../Pages/Main';
import { PlanoAlimentar } from '../../Pages/Pacientes/PlanoAlimentar';
import { PacientesMenu } from '../../Pages/Pacientes/menu';
import { UsuariosPage } from '../../Pages/Usuarios';

export const InternalRoutes = () => {

	return (
		<Routes>
			<Route path="/main" element={<MainPage />} />
			<Route path="/agendamentos" element={<AgendamentosPage />} />
			<Route path="/pacientes" element={<PacientesMenu />} />
			<Route path="/usuarios" element={<UsuariosPage />} />
			<Route path="/atendimento-nutrologo" element={<AtendimentoNutrologo />} />
			<Route path="/acompanhamento" element={<Acompanhamento />} />
			<Route
				path="/atendimento-nutricionista"
				element={<AtendimentoNutricionista />}
			/>
			<Route path="/plano-alimentar/:id" element={<PlanoAlimentar />} />
			<Route path="/novo-plano-alimentar" element={<PlanoAlimentar />} />
		</Routes>
	);

};
