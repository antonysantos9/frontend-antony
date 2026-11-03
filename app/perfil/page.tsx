
import styles from "./page.module.css";

export default function Perfil() {
  const funcionario = {
    nome: "Admin",
    cargo: "ADMIN",
    email: "admin@email.com",
    telefone: "(41) 99999-9999",
    nascimento: "15/08/2008",
    endereco: "Curitiba - PR",
  };

  return (
    <main className={styles.perfilPage}>
      <section className={styles.perfilContainer}>

        <header className={styles.perfilHeader}>
          <div>
            <h1>Athena</h1>
            <p>PORTAL DO ALUNO</p>
          </div>

          <span className={styles.perfilLabel}>
            Meu perfil
          </span>
        </header>

        <div className={styles.perfilDivider} />

        <section className={styles.perfilContent}>

          <div className={styles.perfilTitle}>
            <h2>Meu perfil</h2>
            <p>Visualize suas informações pessoais.</p>
          </div>

          <div className={styles.perfilCard}>

            <div className={styles.perfilUser}>
              <div className={styles.perfilAvatar}>
                {funcionario.nome
                  .split(" ")
                  .slice(0, 2)
                  .map((nome) => nome[0])
                  .join("")}
              </div>

              <div className={styles.perfilUserInfo}>
                <h3>{funcionario.nome}</h3>
                <span>{funcionario.cargo}</span>
              </div>
            </div>

            <div className={styles.perfilSection}>
              <h3>Informações pessoais</h3>

              <div className={styles.perfilGrid}>
                <div className={styles.perfilField}>
                  <label>Nome completo</label>
                  <p>{funcionario.nome}</p>
                </div>

                <div className={styles.perfilField}>
                  <label>Data de nascimento</label>
                  <p>{funcionario.nascimento}</p>
                </div>

                <div className={styles.perfilField}>
                  <label>E-mail</label>
                  <p>{funcionario.email}</p>
                </div>

                <div className={styles.perfilField}>
                  <label>Telefone</label>
                  <p>{funcionario.telefone}</p>
                </div>

                <div className={`${styles.perfilField} ${styles.perfilFull}`}>
                  <label>Endereço</label>
                  <p>{funcionario.endereco}</p>
                </div>
              </div>
            </div>

            <div className={`${styles.perfilSection} ${styles.perfilAccess}`}>
              <h3>Informações de acesso</h3>

              <div className={styles.perfilGrid}>
                <div className={styles.perfilField}>
                  <label>Tipo de usuário</label>
                  <p>{funcionario.cargo}</p>
                </div>

                <div className={styles.perfilField}>
                  <label>Senha</label>
                  <p>••••••••••</p>
                </div>
              </div>
            </div>

            <div className={styles.perfilActions}>
              <button type="button" className={styles.perfilEdit}>
                Editar perfil
              </button>
            </div>

          </div>
        </section>

        <footer className={styles.perfilFooter}>
          <p>© 2026 Athena - Sistema de Gestão Escolar</p>
        </footer>

      </section>
    </main>
  );
}
