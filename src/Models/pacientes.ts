export interface IPaciente {
  nome: string;
  code: string;
  sexo?: string;
  peso?: number;
  dataAgendamento?: Date;
  status?: "aprovado" | "recusado" | "";
}
