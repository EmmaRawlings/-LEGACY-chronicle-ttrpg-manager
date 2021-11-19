import styles from './system-entry.module.css'
import Image from 'next/image'
import systemPic from '../public/system-image-placeholder.jpg'
import Link from 'next/link';

import { faBookOpen, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SystemEntry({ system, session }) {
  return (
  <div className={styles.systemEntry}>
    <div className={styles.flipCard}>
      <div className={styles.front}>
        <div className={styles.image}><Image src={systemPic}></Image></div>
        <div className={styles.actionBar}></div>
        <div className={styles.content}>
          <div className={styles.name}>{system.name}</div>
          <div className={styles.version}>{system.version}</div>
          <div className={styles.author}>{system.author}</div>
          <div className={styles.privacy}>{system.privacy}</div>
        </div>
      </div>
      <div className={styles.back}>
        <div className={styles.image}><Image src={systemPic}></Image></div>
        <div className={styles.actionBar}>
          <Link href={'/system/' + system.name}><span className={styles.actionButton} data-for="system-browser-tooltip" data-tip="View system"><FontAwesomeIcon icon={faBookOpen} /></span></Link>
          {session && session.user._id == system.owner._id && (<Link href={'/edit-system/' + system.name}><span className={styles.actionButton} data-for="system-browser-tooltip" data-tip="Edit system"><FontAwesomeIcon icon={faEdit} /></span></Link>)}
        </div>
        <div className={styles.content}>
          <div className={styles.name}>{system.name}</div>
          <div className={styles.details}>{system.description}</div>
        </div>
      </div>
    </div>
  </div>);
}