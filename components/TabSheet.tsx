import styles from './TabSheet.module.scss';
import { useState } from 'react';
import { Children, cloneElement } from "react";

const TabPage = ({ children, selected }) => <div className={`${styles.tabPage} ${selected && styles.selected}`}>{children}</div>

export default function TabSheet({
		children,
		selectedIndex
	}) {
	return <div className={styles.tabSheet}>
		{ children && children.map((_, i) => <TabPage key={i} selected={i==selectedIndex}>{_}</TabPage>) }
	</div>
}