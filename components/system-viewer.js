import styles from './system-viewer.module.css'
import Image from 'next/image'
import systemPic from '../public/system-image-placeholder.jpg'
import Link from 'next/link';

import WysiwygViewer from './wysiwyg/WysiwygViewer';

import { faLink, faKey, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ReactTooltip from 'react-tooltip';
import NoSsr from '../components/NoSsr';

import { rawtextPlugin } from '../lib/TuiPlugins';

export default function SystemViewer({ system, session }) {
  if (system.privacy == "private" && (!session || session.user._id != system.owner._id)) {
    return (<h1>Access denied</h1>);
  }

  return (
  <div className={styles.systemViewerOuter}>
    <div className={styles.image}><Image src={systemPic}></Image></div>
    <div className={styles.systemViewerInner}>
      {system.privacy == "private" && (<div className={styles.privacy} data-for="system-viewer-tooltip" data-tip="private"><FontAwesomeIcon icon={faKey}/></div>)}
      {system.privacy == "unlisted" && (<div className={styles.privacy} data-for="system-viewer-tooltip" data-tip="unlisted"><FontAwesomeIcon icon={faLink}/></div>)}
      {session && session.user._id == system.owner._id && (<Link href={'/edit-system/' + system.name}><div className={styles.editButton} data-for="system-viewer-tooltip" data-tip="Edit system"><FontAwesomeIcon icon={faEdit} /></div></Link>)}
      <div className={styles.name}>{system.name}</div>
      <div className={styles.version}>{system.version}</div>
      <div className={styles.author}>{system.author}</div>
      <div className={styles.details}>{system.description}</div>
      <WysiwygViewer
        initialValue={system.rules}
        plugins={[rawtextPlugin]}
      />
    </div>
    <NoSsr>
      <ReactTooltip id="system-viewer-tooltip" effect="solid" type="dark" place="top" multiline={true} backgroundColor="rgba(0,0,0,0.6)"/>
    </NoSsr>
  </div>);
}