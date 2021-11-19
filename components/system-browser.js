import styles from './system-browser.module.css'
import SystemEntry from './system-entry.js'
import { useRouter } from 'next/router';
import React from 'react';
import { createSystem } from '../lib/db-req';

import ReactTooltip from 'react-tooltip';
import NoSsr from '../components/NoSsr';

export default function SystemBrowser({ publicSystems, mySystems, session }) {
  const router = useRouter();
  const newSystemNameInputRef = React.useRef();

  async function newSystemHandler() {
    event.preventDefault();

    const newSystemName = newSystemNameInputRef.current.value;

    try {
      const result = await createSystem({name: newSystemName, ownerId: session.user._id});
      console.log(result);

      if (!result.error) {
        router.push('/edit-system/'+newSystemName);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function tabSelectHandler() {
    var tabs = event.target.parentElement.children;
    var tabIndex;
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove(styles.selected);
      if (tabs[i] == event.target) tabIndex = i;
    }
    event.target.classList.add(styles.selected);

    var tabPages = event.target.parentElement.parentElement.children[1].children;
    for (var i = 0; i < tabPages.length; i++) {
      if (tabIndex == i) {
        tabPages[i].classList.add(styles.selected);
      } else {
        tabPages[i].classList.remove(styles.selected);
      }
    }
  }

  return (
  <div className={styles.systemBrowser}>
    {session && (<div className={styles.tabs}>
      <div className={styles.selected} onClick={tabSelectHandler}>Browse</div>
      {mySystems.length > 0 && (<div onClick={tabSelectHandler}>My systems</div>)}
      <div onClick={tabSelectHandler}>Create a system</div>
    </div>)}
    <div className={styles.tabPages}>
      <div className={`${styles.selected} ${styles.scroll}`}>{publicSystems.map((system) => (<SystemEntry key={system.name} system={system} session={session}></SystemEntry>))}</div>
      {session && mySystems.length > 0 && (<div className={styles.scroll}>{mySystems.map((system) => (<SystemEntry key={system.name} system={system} session={session}></SystemEntry>))}</div>)}
      {session && (<div>
        <form onSubmit={newSystemHandler} className={styles.createForm}>
          <label htmlFor="name"><b>Name</b></label>
          <input type="text" placeholder="Enter Name" required ref={newSystemNameInputRef}/>
          <button>Create System</button>
        </form>
      </div>)}
    </div>
    <NoSsr>
      <ReactTooltip id="system-browser-tooltip" effect="solid" type="dark" place="top" multiline={true} backgroundColor="rgba(0,0,0,0.6)"/>
    </NoSsr>
  </div>);
}
