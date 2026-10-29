import styles from "./page.module.css";

import Button from "@/Components/Button";

import { login } from "./actions"

export default function Login() {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <header className={styles.header}>
          <p className={styles.title}>Athena</p>
          <p className={styles.subTitle}>Portal do aluno</p>
        </header>

        <hr className={styles.divider} />

        <section className={styles.content}>
          <h1 className={styles.h1}>Acesse sua conta</h1>

          <h2 className={styles.h2}>
            Gerencie seus dados escolares com segurança e praticidade.
          </h2>

          <form className={styles.form} action={login}>
            <label className={styles.label} htmlFor="email">
              E-mail
            </label>

            <input
              className={styles.input}
              id="email"
              name="email"
              type="email"
              placeholder="Digite seu e-mail"
              autoComplete="email"
              required
            />

            <label className={styles.label} htmlFor="senha">
              Senha
            </label>

            <input
              className={styles.input}
              id="senha"
              name="senha"
              type="password"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
            />

            <p className={styles.link}>
              Esqueceu sua senha?
            </p>

            <Button type="submit" >Entrar</Button>
          </form>
        </section>

        <footer className={styles.footer}>
          Athena © 2026 — Sistema de gestão escolar
        </footer>
      </section>
    </main>
  );
}