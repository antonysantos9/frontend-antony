
"use client";

import { useState, FormEvent } from "react";
import styles from "./ModalAlunos.module.css";
import { createAluno } from "@/app/alunos/actions";

interface ModalAlunoProps {
    fecharModal: () => void;
    aoCadastrar: () => Promise<void>;
}

export default function ModalAluno({
    fecharModal,
    aoCadastrar
}: ModalAlunoProps) {

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    async function cadastrarAluno(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setCarregando(true);
        setErro("");

        const formData = new FormData(e.currentTarget);

        try {
            const resultado = await createAluno(formData);

            if (!resultado.sucesso) {
                setErro(resultado.erro);
                return;
            }

            await aoCadastrar();
            fecharModal();

        } catch (error) {
            console.error(error);
            setErro("Ocorreu um erro ao cadastrar o aluno.");

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

                        <h2>Novo aluno</h2>

                        <p>
                            Preencha os dados para cadastrar um aluno.
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
                <form onSubmit={cadastrarAluno}>

                    <div className={styles.grid}>

                        <div className={styles.field}>
                            <label>Nome completo</label>

                            <input
                                name="nome"
                                type="text"
                                placeholder="Nome do aluno"
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Matrícula</label>

                            <input
                                name="matricula"
                                type="text"
                                placeholder="Número da matrícula"
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label>CPF</label>

                            <input
                                name="cpf"
                                type="text"
                                placeholder="000.000.000-00"
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Data de nascimento</label>

                            <input
                                name="nascimento"
                                type="date"
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label>E-mail</label>

                            <input
                                name="email"
                                type="email"
                                placeholder="aluno@email.com"
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Telefone</label>

                            <input
                                name="telefone"
                                type="tel"
                                placeholder="(00) 00000-0000"
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Sexo</label>

                            <select
                                name="sexo"
                                defaultValue=""
                                required
                            >
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
                                name="endereco"
                                type="text"
                                placeholder="Endereço completo"
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
                                : "Cadastrar aluno"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}
