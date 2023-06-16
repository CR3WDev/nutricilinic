export interface IPaciente {
	id: number;
	nome: string;
	code: string;
	sexo?: string;
	idade?: number;
	peso?: number;
	pontuario?: string;
	dataAgendamento?: Date;
	status?: 'aprovado' | 'recusado' | '';
}
