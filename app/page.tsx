import styles from "./page.module.css" 

export default function Login() {
  return (
    <main className={styles.main}>
      <p className={styles.title}>Athena</p>
      <p className={styles.subTitle}>Portal do aluno</p>
      <hr/>
      <h1 className={styles.h1}>Acesse sua conta</h1>
      <h2 className={styles.h2}>Gerencie dados com a segurança da Athena</h2>
      <input type="Email" value={}/>
      <input type="Senha" />
      <p className={styles.link}>Esqueceu sua senha?</p>
      <input type="button" value="Entre" />
      
    </main>
  );
}
