
import styles from "./page.module.css";

import Button from "@/Components/Button";

import { login } from "./actions";
import Image from "next/image";

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

            <Button className={styles.Button} type="submit">
              Entrar
            </Button>
          </form>
        </section>

        <div className={styles.rodape}>
          <p>Athena</p>
          <span>Portal do aluno</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
         <Image src="/instagram.png" alt="sla" width={30} height={30}/>
        </a>

        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Image src="/github.png" alt="sla" width={30} height={30}/>
        </a>

        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
         <Image src="/facebook.png" alt="sla" width={30} height={30}/>
        </a>

        <a
          href="https://www.whatsapp.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <Image src="/whatsapp.png" alt="sla" width={30} height={30}/>
        </a>
      </footer>
    </main>
  );
}
