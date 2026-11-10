
"use client";

import { useState, type FormEvent } from "react";
import styles from "./ModalCursos.module.css";
import { createCurso } from "@/app/cursos/actions";

interface ModalCursosProps {
    fecharModal: () => void;
    aoCadastrar: () => Promise<void>;
}

export default function ModalCursos({
    fecharModal,
    aoCadastrar
}: ModalCursosProps) {

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    async function cadastrarCurso(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setCarregando(true);
        setErro("");

        const formData = new FormData(e.currentTarget);

        try {
            const resultado = await createCurso(formData);

            if (!resultado.sucesso) {
                setErro(resultado.erro);
                return;
            }

            await aoCadastrar();
            fecharModal();

        } catch (error) {
            console.error(error);
            setErro("Ocorreu um erro ao cadastrar o curso.");

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

                        <h2>Novo curso</h2>

                        <p>
                            Preencha os dados para cadastrar um curso.
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
                <form onSubmit={cadastrarCurso}>

                    <div className={styles.grid}>

                        <div className={styles.field}>
                            <label>Nome do curso</label>

                            <input
                                name="nome"
                                type="text"
                                placeholder="Nome do curso"
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Carga horária</label>

                            <input
                                name="cargaHoraria"
                                type="number"
                                placeholder="Ex: 120"
                                min="1"
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Descrição</label>

                            <textarea
                                name="descricao"
                                placeholder="Descreva o curso..."
                                required
                                rows={4}
                            />
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
                            disabled={carregando}
                        >
                            {carregando
                                ? "Cadastrando..."
                                : "Cadastrar curso"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}
