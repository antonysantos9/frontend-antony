
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";
import ModalCursos from "@/Components/ModalCursos";
import { getCursosLista } from "./actions";

interface CursoType {
    id: number;
    nome: string;
    descricao: string;
    cargaHoraria: number;
}

export default function Cursos() {
    const router = useRouter();

    const [cursos, setCursos] = useState<CursoType[]>([]);
    const [busca, setBusca] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [carregando, setCarregando] = useState(true);

    // Buscar cursos
    async function carregarCursos() {
        setCarregando(true);

        try {
            const resultado = await getCursosLista();

            if (Array.isArray(resultado)) {
                setCursos(resultado);
            } else if (
                resultado &&
                typeof resultado === "object" &&
                "cursos" in resultado &&
                Array.isArray(resultado.cursos)
            ) {
                setCursos(resultado.cursos as CursoType[]);
            } else {
                setCursos([]);
            }

        } catch (error) {
            console.error("Erro ao buscar cursos:", error);
            setCursos([]);

        } finally {
            setCarregando(false);
        }
    }

   useEffect(() => {
    async function buscarCursos() {
        await carregarCursos();
    }

    buscarCursos();
}, []);

    // Filtrar cursos
    const cursosFiltrados = useMemo(() => {
        return cursos.filter((curso) =>
            curso.nome.toLowerCase().includes(busca.toLowerCase())
        );
    }, [cursos, busca]);

    return (
        <main className={styles.main}>
            <div className={styles.container}>

                {/* Cabeçalho */}
                <header className={styles.header}>
                    <button
                        className={styles.backButton}
                        onClick={() => router.push("/dashboard")}
                    >
                        ← Voltar
                    </button>

                    <div>
                        <h1>Cursos</h1>
                        <p className={styles.subtitle}>
                            Gerencie os cursos cadastrados no sistema.
                        </p>
                    </div>

                    <button
                        className={styles.addButton}
                        onClick={() => setModalAberto(true)}
                    >
                        + Novo curso
                    </button>
                </header>

                {/* Conteúdo */}
                <section className={styles.content}>

                    <div className={styles.topContent}>
                        <p className={styles.counter}>
                            {cursos.length} curso(s) cadastrado(s)
                        </p>

                        <input
                            className={styles.search}
                            type="text"
                            placeholder="Pesquisar curso..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>

                    {/* Lista de cursos */}
                    {carregando ? (
                        <div className={styles.empty}>
                            Carregando cursos...
                        </div>
                    ) : cursosFiltrados.length > 0 ? (

                        <div className={styles.courseList}>
                            {cursosFiltrados.map((curso) => (
                                <article
                                    className={styles.courseCard}
                                    key={curso.id}
                                >
                                    <div className={styles.courseIcon}>
                                        📚
                                    </div>

                                    <div className={styles.courseInfo}>
                                        <h2>{curso.nome}</h2>

                                        <p>{curso.descricao}</p>

                                        <span>
                                            Carga horária: {curso.cargaHoraria} horas
                                        </span>
                                    </div>

                                    <div className={styles.actions}>
                                        <button
                                            className={styles.editButton}
                                            type="button"
                                            onClick={() => {
                                                alert("Edição de cursos ainda não implementada.");
                                            }}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className={styles.deleteButton}
                                            type="button"
                                            onClick={() => {
                                                alert("Exclusão de cursos ainda não implementada.");
                                            }}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>

                    ) : (
                        <div className={styles.empty}>
                            <span>📚</span>
                            <h2>Nenhum curso encontrado</h2>
                            <p>
                                {busca
                                    ? "Tente pesquisar por outro nome."
                                    : "Cadastre um novo curso para começar."}
                            </p>
                        </div>
                    )}

                </section>

                {/* Rodapé */}
                <footer className={styles.footer}>
                    Athena © 2026 - Sistema de Gestão Escolar
                </footer>

            </div>

            {/* Modal de cadastro */}
            {modalAberto && (
                <ModalCursos
                    fecharModal={() => setModalAberto(false)}
                    aoCadastrar={carregarCursos}
                />
            )}

        </main>
    );
}
