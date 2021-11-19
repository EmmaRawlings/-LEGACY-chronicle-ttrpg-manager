import styles from './top-bar.module.css'
import AuthenticationBar from './authentication-bar.js'
import Link from 'next/link';

export default function TopBar({ session }) {
  return <div className={styles.topBar}>
    <footer><section className={styles.copyright}>&#169; 2021 Chronicle ~E Rawlings</section></footer>
    <Link href="/"><div className={styles.webTitle}>Chronicle <span className={styles.webSubTitle}>ttrpg manager</span></div></Link>
    <AuthenticationBar session={session}></AuthenticationBar>
  </div>
}