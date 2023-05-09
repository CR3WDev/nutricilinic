import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export const Conclusao = ({ setActiveIndex }: any) => {
	const navigate = useNavigate();
	return (
		<>
			<div className="flex justify-content-center flex-column align-items-center">
				<h3>Pontuário criado com sucesso!</h3>
				<div>
					<i
						style={{
							fontSize: 100,
							color: '#28A745',
							marginTop: '30px',
							marginBottom: '30px',
						}}
						className="pi pi-check-circle"
					></i>
				</div>
				<div className="flex justify-content-center flex-column text-center">
					<span className="font-bold">Pontuário número 1568 criado</span>
					<span className="font-bold">Paciente: Francisco Edson</span>
				</div>
			</div>
			<div className="flex justify-content-end">
				<Button
					label="finalizar"
					onClick={() => {
						navigate('/pacientes');
					}}
				/>
			</div>
		</>
	);
};
