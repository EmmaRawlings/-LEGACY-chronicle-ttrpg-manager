import styles from './main-layout.module.css'
import TopBar from './top-bar.js'

export default function MainLayout({ children, session }) {
  return <div className={styles.outer}>
      <TopBar session={session}></TopBar>
      <div className={styles.inner}>
        <main><div>{children}</div></main>
      </div>
    </div>
}