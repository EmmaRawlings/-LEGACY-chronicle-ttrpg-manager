import styles from './TabRow.module.scss'
import { useState } from 'react';
import { Children, cloneElement } from "react";

const Tab = ({children, selected, onClick}) => <div className={`${styles.tab} ${selected && styles.selected}`} onClick={onClick}>{children}</div>

export default function TabRow({ 
		children, 
		selectedIndex = 0,
		selectHandler = (i) => {},
		buttons = [], 
		buttonHandlers= []
	}) {

	if (buttons.length != buttonHandlers.length) {
		throw "Button handlers array must contain an entry for each button in the button array.";
	}

	var buttonElements = [];
	for (var i = 0; i < buttons.length; i++) {
		const handler = buttonHandlers[i];
		buttonElements.push(<div key={"button_"+i} className={styles.button} onClick={handler}>
			{ buttons[i] }
		</div>);
	}

	return <div className={styles.tabRow}>
		{ children && children.map((_, i) => <Tab key={"tab_"+i} selected={i==selectedIndex} onClick={() => selectHandler(i)}>{_}</Tab>) }
		{ buttonElements }
	</div>
}