import styles from './system-editor.module.css'
import React from 'react';
import Image from 'next/image'
import systemPic from '../public/system-image-placeholder.jpg'
import Link from 'next/link';
import { saveSystem } from '../lib/db-req';
import { useRouter } from 'next/router';

import WysiwygEditor from './wysiwyg/WysiwygEditor';

import { rawtextPlugin } from '../lib/TuiPlugins';
import DataManager from './DataManager';

const SystemEditor = ({ system, session }) => {
  const router = useRouter();
  const nameInputRef = React.useRef();
  const versionInputRef = React.useRef();
  const authorInputRef = React.useRef();
  const privacyInputRef = React.useRef();
  const descriptionInputRef = React.useRef();
  const rulesInputRef = React.useRef<EditorType>();
  const dataModelsRef = React.createRef();

  async function saveHandler(event) {
    event.preventDefault();

    system.name = nameInputRef.current.value;
    system.version = versionInputRef.current.value;
    system.author = authorInputRef.current.value;
    system.privacy = privacyInputRef.current.value;
    system.description = descriptionInputRef.current.value;
    system.rules = rulesInputRef.current.getInstance().getMarkdown();
    system.dataModels = dataModelsRef.current.state.dataModels;

    try {
      const result = await saveSystem(system);
      console.log(result);

      if (!result.error) {
        router.push('/system/'+system.name);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!session || session.user._id != system.owner._id) {
    return (<h1>Access denied</h1>);
  }

  return (
  <div className={styles.systemEditorOuter}>
    <div className={styles.image}><Image src={systemPic}></Image></div>
    <div className={styles.systemEditorInner}>
      <form onSubmit={saveHandler}>
        <button>Save</button>
        <label htmlFor="name"><b>Name</b></label>
        <input type="text" className={styles.name} defaultValue={system.name} ref={nameInputRef}></input>
        <label htmlFor="version"><b>Version</b></label>
        <input type="text" className={styles.version} defaultValue={system.version} ref={versionInputRef}></input>
        <label htmlFor="author"><b>Author</b></label>
        <input type="text" className={styles.author} defaultValue={system.author} ref={authorInputRef}></input>
        <label htmlFor="privacy"><b>Privacy</b></label>
        <input type="text" className={styles.privacy} defaultValue={system.privacy} ref={privacyInputRef}></input>
        <label htmlFor="description"><b>Description</b></label>
        <textarea className={styles.details} defaultValue={system.description} ref={descriptionInputRef}></textarea>
        <label htmlFor="rules"><b>Data</b></label>
        <DataManager dataModels={system.dataModels} ref={dataModelsRef}/>
        <label htmlFor="rules"><b>Rules</b></label>
        <WysiwygEditor
          initialValue={system.rules}
          previewStyle="vertical"
          height="600px"
          useCommandShortcut={true}
          ref={rulesInputRef}
          //hideModeSwitch={true}
          placeholder="rules..."
          plugins={[rawtextPlugin]}
          hideModeSwitch={false}
        />
      </form>
    </div>
  </div>);
}

export default SystemEditor;