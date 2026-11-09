
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: "⌂", active: true },
  { name: "Alunos", href: "/alunos", icon: "♙" },
  { name: "Cursos", href: "/cursos", icon: "▤" },
  { name: "Matrículas", href: "/matriculas", icon: "▣" },
  { name: "Funcionários", href: "/funcionarios", icon: "♧" },
];

const statistics = [
  {
    title: "Total de alunos",
    value: "—",
    description: "Alunos cadastrados",
    icon: "♙",
  },
  {
    title: "Cursos",
    value: "—",
    description: "Cursos disponíveis",
    icon: "▤",
  },
  {
    title: "Matrículas",
    value: "—",
    description: "Matrículas realizadas",
    icon: "▣",
  },
  {
    title: "Funcionários",
    value: "—",
    description: "Funcionários cadastrados",
    icon: "♧",
  },
];

const shortcuts = [
  {
    title: "Cadastrar aluno",
    description: "Adicionar um novo aluno ao sistema.",
    href: "/alunos/cadastrar",
    icon: "＋",
  },
  {
    title: "Cadastrar curso",
    description: "Adicionar um novo curso.",
    href: "/cursos/cadastrar",
    icon: "▤",
  },
  {
    title: "Realizar matrícula",
    description: "Matricular um aluno em um curso.",
    href: "/matriculas/cadastrar",
    icon: "▣",
  },
];

export default function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
            <Image src="/A.jpg" alt="Logo" width={50} height={50} className={styles.img}/>
          <div>
            <h2>Athena</h2>
            <span>GESTÃO ESCOLAR</span>
          </div>
        </div>

        <div className={styles.menuTitle}>MENU PRINCIPAL</div>

        <nav className={styles.navigation}>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${styles.navItem} ${
                item.active ? styles.active : ""
              }`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
         

          <div className={styles.sidebarFooter}>
            <span>ATHENA © 2026</span>
            <span>Sistema de Gestão Escolar</span>
          </div>
        </div>
      </aside>

      <section className={styles.mainContent}>
        <header className={styles.topbar}>
          <div>
            <span className={styles.breadcrumb}>
              Página inicial / Dashboard
            </span>
            <h1>Dashboard</h1>
          </div>

          <Link href="/perfil" className={styles.userArea}>
            <div className={styles.avatar}>F</div>
            <div className={styles.userInfo}>
              <strong>Funcionário</strong>
              <span>Visualizar perfil</span>
            </div>
            <span className={styles.userArrow}>⌄</span>
          </Link>
        </header>

        <div className={styles.content}>
          <section className={styles.welcome}>
            <div>
              <span className={styles.welcomeLabel}>
                PAINEL DE CONTROLE
              </span>
              <h2>Bem-vindo ao Athena!</h2>
              <p>
                Gerencie as informações da instituição de maneira
                simples e organizada.
              </p>
            </div>

            <div className={styles.welcomeDecoration}>A</div>
          </section>

          <section className={styles.statisticsSection}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Visão geral</h2>
                <p>Resumo das informações da instituição.</p>
              </div>
            </div>

            <div className={styles.statisticsGrid}>
              {statistics.map((item) => (
                <article className={styles.statCard} key={item.title}>
                  <div className={styles.statTop}>
                    <span className={styles.statIcon}>
                      {item.icon}
                    </span>
                    <span className={styles.statDecoration}>●</span>
                  </div>

                  <h3>{item.title}</h3>
                  <strong className={styles.statValue}>
                    {item.value}
                  </strong>
                  <span className={styles.statDescription}>
                    {item.description}
                  </span>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.lowerSection}>
            <div className={styles.shortcutsSection}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Acesso rápido</h2>
                  <p>Atalhos para as principais funcionalidades.</p>
                </div>
              </div>

              <div className={styles.shortcutsGrid}>
                {shortcuts.map((item) => (
                  <Link
                    href={item.href}
                    className={styles.shortcutCard}
                    key={item.title}
                  >
                    <span className={styles.shortcutIcon}>
                      {item.icon}
                    </span>

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <span className={styles.shortcutArrow}>→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.activitySection}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Atividades recentes</h2>
                  <p>Últimas movimentações do sistema.</p>
                </div>
              </div>

              <div className={styles.emptyActivity}>
                <span className={styles.activityIcon}>◷</span>
                <strong>Nenhuma atividade recente</strong>
                <p>
                  Quando houver movimentações, elas aparecerão
                  nesta área.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
