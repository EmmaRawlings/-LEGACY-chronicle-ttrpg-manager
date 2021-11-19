import styles from './DataManager.module.css'
import React, { useState, useRef, createRef } from 'react';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TabRow from './TabRow';
import TabSheet from './TabSheet';
import DbService from '../lib/db';

const DataField = ({ children, selected }) => <div className={`${styles.tabPage} ${selected && styles.selected}`}>{children}</div>

class TabPage extends React.Component {
	/* { dataModel, onSave } */
	constructor(props) {
		super(props);
		this.state = {
			dataFields: props.dataModel.fields
		};
		this.modelNameInputRef = createRef();
	}

	private newFieldHandler() {
		console.log('newFieldHandler');
	}

	private onSaveHandler() {
		dataModel.name = this.modelNameInputRef.current.value;
		props.onSave(dataModel);
	}

	public render() {
		return <div>
	  	<button type="button" onClick={this.onSaveHandler}>Save</button>
	    <label htmlFor="name"><b>Name</b></label>
	    <input type="text" placeholder="Enter model name" required ref={this.modelNameInputRef} defaultValue={this.props.dataModel.name}/>
			<h3>Fields</h3>
			<div className={styles.dataFields}>
				<div className={styles.newField} onClick={this.newFieldHandler}><FontAwesomeIcon icon={faPlusSquare}/></div>
			</div>
			<h3>Presentation</h3>
			<h3>Instances</h3>
		</div>;
	}
}

export default class DataManager extends React.Component {

  constructor(props) {
	  super(props);
	  this.state = {
	  	selectedIndex: 0,
			dataModels: this.props.dataModels
	  }
  }

	private newTab() {
		this.setState({
	  	selectedIndex: this.state.dataModels.length,
			dataModels: this.state.dataModels.concat({
				name: 'new'
			})
		});
	}

	private saveHandler_tabPage(dataModel, index) {
		const newDataModels = this.state.dataModels.slice(0);
		newDataModels[index] = dataModel;
		this.setState(newDataModels);
	}

	public render() {
		return <div>
			<TabRow
				buttons={[<FontAwesomeIcon icon={faPlus}/>]}
				buttonHandlers={[() => this.newTab()]}
				selectedIndex={this.state.selectedIndex}
				selectHandler={(i) => this.setState({
					selectedIndex: i
				})}
			>{this.state.dataModels.map((dataModel) => (dataModel.name))}</TabRow>
			<TabSheet selectedIndex={this.state.selectedIndex}>{this.state.dataModels.map((dataModel, i) => (<TabPage key={ "tab-page_"+i } dataModel={ dataModel } onSave={(dataModel) => this.saveHandler_tabPage(dataModel, i)}/>))}</TabSheet>
		</div>
	}
}