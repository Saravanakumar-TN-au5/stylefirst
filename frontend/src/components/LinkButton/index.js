import React, { Component } from 'react';
import styles from './LinkButton.module.scss';
import { Link } from 'react-router-dom';

export default class LinkButton extends Component{
    constructor(props) {
        super(props);
        this.hoverRef = React.createRef();
        this.textRef = React.createRef();
    }

    state = {
        hover: false
    }

    componentDidUpdate() {
        if (this.state.hover) {
            this.hoverRef.current.classList.add(styles['hover'])
            return
        }
        this.hoverRef.current.classList.remove(styles['hover'])
    }

    render() {
        return (
            <Link to={this.props.link} style={{textDecoration:'none'}}>
                <div className={styles[this.props.color]} onMouseOver={() => this.setState({hover:true})}
                    onMouseOut={() => this.setState({hover: false})} onClick={this.props.event}>
                    <span className={styles['btn--hover']+' '} ref={this.hoverRef}></span>
                    <span ref={this.textRef}>{this.props.name}</span>
                </div>
            </Link>
        );
    }
}