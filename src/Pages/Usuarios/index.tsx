import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, useMode } from '../../Redux/mode';
import { api } from '../../Services/axios';
import UsuarioForm from './UsuarioForm';

interface UsuarioProps {
	id: number;
	nome: string;
	cpf: string;
}

export const UsuariosPage = () => {
	const toast = useRef<any>();
	const dispatch = useDispatch();
	const mode = useSelector(useMode);
	const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
	const [usuarioAlteracao, setUsuarioAlteracao] = useState<UsuarioProps>();

	const handleEdit = (usuario: UsuarioProps) => {
		dispatch(setMode('edit'));
		setUsuarioAlteracao(usuario);
	};

	const handleAdd = () => {
		dispatch(setMode('add'));
		setUsuarioAlteracao(undefined);
	};

	const handleDelete = async (idUsuario: number) => {
		const isConfirmed = confirm('Confirmar operação?');
		if (isConfirmed) {
			try {
				await api.delete(`/usuarios/${idUsuario}`);

				toast.current?.show({
					severity: 'success',
					summary: 'Atenção',
					detail: 'Usuário exluído com sucesso',
				});

				pesquisarUsuarios();
			} catch (error) {
				toast.current?.show({
					severity: 'error',
					summary: 'Atenção',
					detail: 'Falha ao excluir usuário. Tente novamente em instantes',
				});
			}
		}
	};
	const actionsColumns = (usuario: UsuarioProps) => {
		return (
			<div style={{ display: 'flex', width: '70px' }}>
				<Button
					icon="pi pi-pencil"
					style={{ height: '20px' }}
					className=" p-button-text mr-2"
					onClick={() => handleEdit(usuario)}
				/>
				<Button
					icon="pi pi-trash"
					className="p-button-text p-button-danger"
					style={{ height: '20px' }}
					onClick={() => handleDelete(usuario.id)}
				/>
			</div>
		);
	};

	async function pesquisarUsuarios() {
		const { data } = await api.get('/usuarios');
		setUsuarios(data);
	}

	useEffect(() => {
		dispatch(setMode('search'));
		pesquisarUsuarios();
	}, []);

	useEffect(() => {
		pesquisarUsuarios();
	}, [mode]);

	return (
		<>
			<Toast ref={toast} />
			{mode === 'edit' || mode === 'add' ? (
				<UsuarioForm
					id={usuarioAlteracao?.id}
					cpf={usuarioAlteracao?.cpf}
					nome={usuarioAlteracao?.nome}
				/>
			) : null}
			{mode === 'search' || mode === 'delete' ? (
				<>
					<h1 className="mb-4">Tabela de Usuários</h1>
					<Toolbar
						className="mb-4"
						start={
							<>
								<Button
									onClick={() => {
										handleAdd();
									}}
								>
									<i className="pi pi-plus mr-2"></i>
									Cadastrar
								</Button>
							</>
						}
					/>
					<DataTable value={usuarios} scrollable scrollHeight="400px">
						<Column field="id" header="ID"></Column>
						<Column field="nome" header="Nome"></Column>
						<Column field="cpf" header="CPF"></Column>
						<Column
							body={(data) => actionsColumns(data)}
							header={'ações'}
							className="py-2"
						/>
					</DataTable>
				</>
			) : null}
		</>
	);
};
