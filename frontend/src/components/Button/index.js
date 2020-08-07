import React from 'react';
import styles from './Button.module.scss';

export default function Button(props) {
    return (
        props.isDisabled ?
        <button type={props.type} className={styles[props.color]} 
        onClick={props.event} disabled>{props.name}</button> :
        <button type={props.type} className={styles[props.color]}
        onClick={props.event}>{props.name}</button>
    );
}