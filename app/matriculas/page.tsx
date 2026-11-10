
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";
import ModalMatricula from "@/Components/ModalMatriculas";
import { getMatriculasLista } from "./actions";

interface MatriculaType {
    id: number;
    aluno: {
        nome: string;
    };
    curso: {
        nome: string;
    };
    data: string;
}

export default function Matriculas() {
    const router = useRouter();

    const [matriculas, setMatriculas] = useState<MatriculaType[]>([]);
    const [busca, setBusca] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [carregando, setCarregando] = useState(true);

    // Buscar matrículas
    async function carregarMatriculas() {
        setCarregando(true);

        try {
            const resultado = await getMatriculasLista();

            if (Array.isArray(resultado)) {
                setMatriculas(resultado);
            } else if (
                resultado &&
                typeof resultado === "object" &&
                "matriculas" in resultado &&
                Array.isArray(resultado.matriculas)
            ) {
                setMatriculas(resultado.matriculas as MatriculaType[]);
            } else {
                setMatriculas([]);
            }

        } catch (error) {
            console.error("Erro ao buscar matrículas:", error);
            setMatriculas([]);

        } finally {
            setCarregando(false);
        }
    }

    // Carregar matrículas ao abrir a página
    useEffect(() => {
        async function buscarMatriculas() {
            await carregarMatriculas();
        }

        buscarMatriculas();
    }, []);

    // Filtrar matrículas
    const matriculasFiltradas = useMemo(() => {
        return matriculas.filter((matricula) =>
            `${matricula.aluno?.nome || ""} ${matricula.curso?.nome || ""}`
                .toLowerCase()
                .includes(busca.toLowerCase())
        );
    }, [matriculas, busca]);

    // Formatar data
    function formatarData(data: string) {
        if (!data) return "Data não informada";

        return new Date(data).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
        });
    }

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
                        <h1>Matrículas</h1>
                        <p className={styles.subtitle}>
                            Gerencie as matrículas dos alunos nos cursos.
                        </p>
                    </div>

                    <button
                        className={styles.addButton}
                        onClick={() => setModalAberto(true)}
                    >
                        + Nova matrícula
                    </button>
                </header>

                {/* Conteúdo */}
                <section className={styles.content}>

                    <div className={styles.topContent}>
                        <p className={styles.counter}>
                            {matriculas.length} matrícula(s) cadastrada(s)
                        </p>

                        <input
                            className={styles.search}
                            type="text"
                            placeholder="Pesquisar aluno ou curso..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>

                    {/* Lista de matrículas */}
                    {carregando ? (
                        <div className={styles.empty}>
                            Carregando matrículas...
                        </div>
                    ) : matriculasFiltradas.length > 0 ? (

                        <div className={styles.matriculaList}>
                            {matriculasFiltradas.map((matricula) => (
                                <article
                                    className={styles.matriculaCard}
                                    key={matricula.id}
                                >
                                    <div className={styles.matriculaIcon}>
                                        📋
                                    </div>

                                    <div className={styles.matriculaInfo}>
                                        <h2>
                                            {matricula.aluno?.nome || "Aluno não informado"}
                                        </h2>

                                        <p>
                                            Curso: {matricula.curso?.nome || "Curso não informado"}
                                        </p>

                                        <span>
                                            Data da matrícula: {formatarData(matricula.data)}
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>

                    ) : (
                        <div className={styles.empty}>
                            <span>📋</span>
                            <h2>Nenhuma matrícula encontrada</h2>

                            <p>
                                {busca
                                    ? "Tente pesquisar por outro aluno ou curso."
                                    : "Cadastre uma nova matrícula para começar."}
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
                <ModalMatricula
                    fecharModal={() => setModalAberto(false)}
                    aoCadastrar={carregarMatriculas}
                />
            )}

        </main>
    );
}
