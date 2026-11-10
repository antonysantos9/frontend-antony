
"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Perfil() {
  const router = useRouter();

  // Dados de exemplo do funcionário
  const funcionario = {
    nome: "Admin",
    cargo: "ADMIN",
    email: "admin@email.com",
    telefone: "(41) 99999-9999",
    nascimento: "15/08/2008",
    endereco: "Curitiba - PR",
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Botão para voltar ao Dashboard */}
        <button
          className={styles.backButton}
          onClick={() => router.push("/dashboard")}
        >
          ← Voltar ao Dashboard
        </button>

        {/* Cabeçalho */}
        <header className={styles.header}>
          <div>
            <span className={styles.portal}>ATHENA | PORTAL DO FUNCIONÁRIO</span>
            <span className={styles.label}>Meu perfil</span>
            <h1>Perfil</h1>
            <p>Visualize suas informações pessoais.</p>
          </div>
        </header>

        {/* Cartão do perfil */}
        <section className={styles.profileCard}>
          {/* Identificação */}
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>
              {funcionario.nome.charAt(0).toUpperCase()}
            </div>

            <div className={styles.profileName}>
              <h2>{funcionario.nome}</h2>
              <span>{funcionario.cargo}</span>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Informações pessoais */}
          <div className={styles.section}>
            <h3>Informações pessoais</h3>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span>Nome completo</span>
                <p>{funcionario.nome}</p>
              </div>

              <div className={styles.infoItem}>
                <span>E-mail</span>
                <p>{funcionario.email}</p>
              </div>

              <div className={styles.infoItem}>
                <span>Telefone</span>
                <p>{funcionario.telefone}</p>
              </div>

              <div className={styles.infoItem}>
                <span>Data de nascimento</span>
                <p>{funcionario.nascimento}</p>
              </div>

              <div className={styles.infoItem}>
                <span>Endereço</span>
                <p>{funcionario.endereco}</p>
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Informações de acesso */}
          <div className={styles.section}>
            <h3>Informações de acesso</h3>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span>Cargo</span>
                <p>{funcionario.cargo}</p>
              </div>

              <div className={styles.infoItem}>
                <span>Senha</span>
                <p>••••••••••</p>
              </div>
            </div>
          </div>

          {/* Botão editar */}
          <div className={styles.buttonContainer}>
            <button className={styles.editButton}>
              Editar perfil
            </button>
          </div>
        </section>

        {/* Rodapé */}
        <footer className={styles.footer}>
          © 2026 Athena - Sistema de Gestão Escolar
        </footer>
      </div>
    </main>
  );
}
