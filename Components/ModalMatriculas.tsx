
"use client";

import { useState, type FormEvent } from "react";
import styles from "./ModalMatriculas.module.css";
import {
    createMatricula,
    getAlunosLista,
    getCursosLista
} from "@/app/matriculas/actions";

interface ModalMatriculaProps {
    fecharModal: () => void;
    aoCadastrar: () => Promise<void>;
}

interface Aluno {
    id: number;
    nome: string;
    matricula: string;
}

interface Curso {
    id: number;
    nome: string;
}

export default function ModalMatricula({
    fecharModal,
    aoCadastrar
}: ModalMatriculaProps) {

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);

    const [buscandoDados, setBuscandoDados] = useState(true);

    // Buscar alunos e cursos
    async function carregarDados() {
        try {
            const [alunosData, cursosData] = await Promise.all([
                getAlunosLista(),
                getCursosLista()
            ]);

            if (Array.isArray(alunosData)) {
                setAlunos(alunosData);
            }

            if (Array.isArray(cursosData)) {
                setCursos(cursosData);
            }

        } catch (error) {
            console.error(error);
            setErro("Não foi possível carregar alunos e cursos.");

        } finally {
            setBuscandoDados(false);
        }
    }

    // Carregar os dados ao abrir o modal
    useState(() => {
        carregarDados();
    });

    // Cadastrar matrícula
    async function cadastrarMatricula(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setCarregando(true);
        setErro("");

        const formData = new FormData(e.currentTarget);

        try {
            const resultado = await createMatricula(formData);

            if (!resultado.sucesso) {
                setErro(resultado.erro);
                return;
            }

            await aoCadastrar();
            fecharModal();

        } catch (error) {
            console.error(error);
            setErro("Ocorreu um erro ao cadastrar a matrícula.");

        } finally {
            setCarregando(false);
        }
    }

    return (
        <div
            className={styles.overlay}
            onClick={fecharModal}
        >
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >

                {/* Cabeçalho */}
                <header className={styles.header}>
                    <div>
                        <span>CADASTRO</span>

                        <h2>Nova matrícula</h2>

                        <p>
                            Preencha os dados para matricular um aluno em um curso.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={fecharModal}
                        className={styles.close}
                        disabled={carregando}
                    >
                        ×
                    </button>
                </header>

                {/* Formulário */}
                <form onSubmit={cadastrarMatricula}>

                    <div className={styles.grid}>

                        {/* Aluno */}
                        <div className={styles.field}>
                            <label>Aluno</label>

                            <select
                                name="alunoId"
                                defaultValue=""
                                required
                                disabled={buscandoDados}
                            >
                                <option value="" disabled>
                                    {buscandoDados
                                        ? "Carregando alunos..."
                                        : "Selecione um aluno"}
                                </option>

                                {alunos.map((aluno) => (
                                    <option
                                        key={aluno.id}
                                        value={aluno.id}
                                    >
                                        {aluno.nome} - {aluno.matricula}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Curso */}
                        <div className={styles.field}>
                            <label>Curso</label>

                            <select
                                name="cursoId"
                                defaultValue=""
                                required
                                disabled={buscandoDados}
                            >
                                <option value="" disabled>
                                    {buscandoDados
                                        ? "Carregando cursos..."
                                        : "Selecione um curso"}
                                </option>

                                {cursos.map((curso) => (
                                    <option
                                        key={curso.id}
                                        value={curso.id}
                                    >
                                        {curso.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {/* Erro */}
                    {erro && (
                        <p className={styles.error}>
                            {erro}
                        </p>
                    )}

                    {/* Botões */}
                    <div className={styles.actions}>

                        <button
                            type="button"
                            className={styles.cancel}
                            onClick={fecharModal}
                            disabled={carregando}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className={styles.save}
                            disabled={carregando || buscandoDados}
                        >
                            {carregando
                                ? "Cadastrando..."
                                : "Cadastrar matrícula"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}
