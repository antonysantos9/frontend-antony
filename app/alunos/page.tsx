
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { getAlunosLista } from "./actions";

interface AlunoType {
    nome: string;
    matricula: string;
    id: number;
    curso: string;
    email: string;
}

export default function Alunos() {
    const router = useRouter();

    const [pesquisa, setPesquisa] = useState("");
    const [alunos, setAlunos] = useState([] as AlunoType[]);
    const [modalAberto, setModalAberto] = useState(false);

    // Buscar alunos da API
    useEffect(() => {
        getAlunosLista().then((data) => {
            if (Array.isArray(data)) {
                setAlunos(data);
            }
        });
    }, []);

    // Filtrar alunos
    const alunosFiltrados = useMemo(() => {
        if (!Array.isArray(alunos)) {
            return [];
        }

        return alunos.filter((aluno) =>
            aluno.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
            aluno.matricula.includes(pesquisa)
        );
    }, [alunos, pesquisa]);

    return (
        <main className={styles.main}>
            <div className={styles.container}>

                {/* CABEÇALHO */}
                <header className={styles.header}>
                    <div>
                        <button
                            className={styles.backButton}
                            onClick={() => router.push("/dashboard")}
                        >
                            ← Voltar ao Dashboard
                        </button>

                        <span className={styles.subtitle}>
                            GERENCIAMENTO
                        </span>

                        <h1>Alunos</h1>

                        <p>
                            Gerencie os alunos cadastrados na instituição.
                        </p>
                    </div>

                    <button
                        className={styles.addButton}
                        onClick={() => setModalAberto(true)}
                    >
                        + Novo aluno
                    </button>
                </header>

                {/* LISTAGEM */}
                <section className={styles.content}>
                    <div className={styles.topContent}>
                        <div>
                            <h2>Todos os alunos</h2>
                            <p>Confira os alunos cadastrados.</p>
                        </div>

                        <span className={styles.counter}>
                            {alunos.length} alunos
                        </span>
                    </div>

                    {/* PESQUISA */}
                    <input
                        className={styles.search}
                        type="text"
                        placeholder="Pesquisar por nome ou matrícula..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                    />

                    {/* LISTA */}
                    <div className={styles.studentList}>
                        {alunosFiltrados.length > 0 ? (
                            alunosFiltrados.map((aluno) => (
                                <article
                                    className={styles.studentCard}
                                    key={aluno.id}
                                >
                                    <div className={styles.studentIcon}>
                                        {aluno.nome.charAt(0)}
                                    </div>

                                    <div className={styles.studentInfo}>
                                        <h3>{aluno.nome}</h3>

                                        <p>{aluno.email}</p>

                                        <span>
                                            Matrícula: {aluno.matricula}
                                        </span>

                                        <small>
                                            Curso: {aluno.curso}
                                        </small>
                                    </div>

                                    <div className={styles.actions}>
                                        <button className={styles.viewButton}>
                                            Visualizar
                                        </button>

                                        <button className={styles.editButton}>
                                            Editar
                                        </button>

                                        <button className={styles.deleteButton}>
                                            Excluir
                                        </button>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <p className={styles.empty}>
                                Nenhum aluno encontrado.
                            </p>
                        )}
                    </div>
                </section>

                {/* RODAPÉ */}
                <footer className={styles.footer}>
                    Athena © 2026 - Sistema de Gestão Escolar
                </footer>

                {/* MODAL DE CADASTRO */}
                {modalAberto && (
                    <div
                        className={styles.modalOverlay}
                        onClick={() => setModalAberto(false)}
                    >
                        <div
                            className={styles.modal}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* CABEÇALHO DO MODAL */}
                            <div className={styles.modalHeader}>
                                <div>
                                    <span className={styles.subtitle}>
                                        CADASTRO
                                    </span>

                                    <h2>Novo aluno</h2>

                                    <p>
                                        Preencha os dados para cadastrar um aluno.
                                    </p>
                                </div>

                                <button
                                    className={styles.closeButton}
                                    type="button"
                                    onClick={() => setModalAberto(false)}
                                >
                                    ×
                                </button>
                            </div>

                            {/* FORMULÁRIO */}
                            <form
                                className={styles.form}
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className={styles.formGrid}>
                                    <div className={styles.field}>
                                        <label>Nome completo</label>
                                        <input
                                            type="text"
                                            placeholder="Nome do aluno"
                                            required
                                        />
                                    </div>

                                    <div className={styles.field}>
                                        <label>Matrícula</label>
                                        <input
                                            type="text"
                                            placeholder="Número da matrícula"
                                            required
                                        />
                                    </div>

                                    <div className={styles.field}>
                                        <label>CPF</label>
                                        <input
                                            type="text"
                                            placeholder="000.000.000-00"
                                            required
                                        />
                                    </div>

                                    <div className={styles.field}>
                                        <label>Data de nascimento</label>
                                        <input
                                            type="date"
                                            required
                                        />
                                    </div>

                                    <div className={styles.field}>
                                        <label>E-mail</label>
                                        <input
                                            type="email"
                                            placeholder="aluno@email.com"
                                            required
                                        />
                                    </div>

                                    <div className={styles.field}>
                                        <label>Telefone</label>
                                        <input
                                            type="tel"
                                            placeholder="(00) 00000-0000"
                                        />
                                    </div>

                                    <div className={styles.field}>
                                        <label>Sexo</label>
                                        <select defaultValue="" required>
                                            <option value="" disabled>
                                                Selecione
                                            </option>

                                            <option value="M">
                                                Masculino
                                            </option>

                                            <option value="F">
                                                Feminino
                                            </option>
                                        </select>
                                    </div>

                                    <div className={styles.field}>
                                        <label>Endereço</label>
                                        <input
                                            type="text"
                                            placeholder="Endereço completo"
                                        />
                                    </div>
                                </div>

                                {/* BOTÕES */}
                                <div className={styles.modalActions}>
                                    <button
                                        type="button"
                                        className={styles.cancelButton}
                                        onClick={() => setModalAberto(false)}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className={styles.saveButton}
                                    >
                                        Cadastrar aluno
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}
