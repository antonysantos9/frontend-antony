
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";
import ModalFuncionario from "@/Components/ModalFuncionarios";
import { getFuncionariosLista } from "./actions";

interface FuncionarioType {
    id: number;
    nome: string;
    email: string;
    cargo: string;
    telefone: string;
}

export default function Funcionarios() {
    const router = useRouter();

    const [funcionarios, setFuncionarios] = useState<FuncionarioType[]>([]);
    const [busca, setBusca] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [carregando, setCarregando] = useState(true);

    // Buscar funcionários
    async function carregarFuncionarios() {
        setCarregando(true);

        try {
            const resultado = await getFuncionariosLista();

            if (Array.isArray(resultado)) {
                setFuncionarios(resultado);
            } else if (
                resultado &&
                typeof resultado === "object" &&
                "funcionarios" in resultado &&
                Array.isArray(resultado.funcionarios)
            ) {
                setFuncionarios(resultado.funcionarios as FuncionarioType[]);
            } else {
                setFuncionarios([]);
            }

        } catch (error) {
            console.error("Erro ao buscar funcionários:", error);
            setFuncionarios([]);

        } finally {
            setCarregando(false);
        }
    }

    // Carregar funcionários ao abrir a página
    useEffect(() => {
        async function buscarFuncionarios() {
            await carregarFuncionarios();
        }

        buscarFuncionarios();
    }, []);

    // Filtrar funcionários
    const funcionariosFiltrados = useMemo(() => {
        return funcionarios.filter((funcionario) =>
            funcionario.nome.toLowerCase().includes(busca.toLowerCase())
        );
    }, [funcionarios, busca]);

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
                        <h1>Funcionários</h1>
                        <p className={styles.subtitle}>
                            Gerencie os funcionários cadastrados no sistema.
                        </p>
                    </div>

                    <button
                        className={styles.addButton}
                        onClick={() => setModalAberto(true)}
                    >
                        + Novo funcionário
                    </button>
                </header>

                {/* Conteúdo */}
                <section className={styles.content}>

                    <div className={styles.topContent}>
                        <p className={styles.counter}>
                            {funcionarios.length} funcionário(s) cadastrado(s)
                        </p>

                        <input
                            className={styles.search}
                            type="text"
                            placeholder="Pesquisar funcionário..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>

                    {/* Lista de funcionários */}
                    {carregando ? (
                        <div className={styles.empty}>
                            Carregando funcionários...
                        </div>
                    ) : funcionariosFiltrados.length > 0 ? (

                        <div className={styles.employeeList}>
                            {funcionariosFiltrados.map((funcionario) => (
                                <article
                                    className={styles.employeeCard}
                                    key={funcionario.id}
                                >
                                    <div className={styles.employeeIcon}>
                                        👤
                                    </div>

                                    <div className={styles.employeeInfo}>
                                        <h2>{funcionario.nome}</h2>

                                        <p>{funcionario.email}</p>

                                        <span>
                                            {funcionario.cargo}
                                        </span>

                                        <span>
                                            Telefone: {funcionario.telefone}
                                        </span>
                                    </div>

                                    <div className={styles.actions}>
                                        <button
                                            className={styles.editButton}
                                            type="button"
                                            onClick={() => {
                                                alert("Edição de funcionários ainda não implementada.");
                                            }}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className={styles.deleteButton}
                                            type="button"
                                            onClick={() => {
                                                alert("Exclusão de funcionários ainda não implementada.");
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
                            <span>👥</span>
                            <h2>Nenhum funcionário encontrado</h2>

                            <p>
                                {busca
                                    ? "Tente pesquisar por outro nome."
                                    : "Cadastre um novo funcionário para começar."}
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
                <ModalFuncionario
                    fecharModal={() => setModalAberto(false)}
                    aoCadastrar={carregarFuncionarios}
                />
            )}

        </main>
    );
}
