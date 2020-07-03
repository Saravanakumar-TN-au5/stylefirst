import React, { Component } from 'react';
import styles from './SearchBlock.module.scss';

export default class SearchBlock extends Component{
    constructor(props) {
        super(props);
        this.searchInput = React.createRef()
    }

    componentDidMount() {
        this.searchInput.current.focus();
    }

    render() {
        return (
            <form className={styles['search__form']}>
                <input type='text' placeholder='Search' className={styles['search__field']} ref={this.searchInput}/>
            </form>
        );
    }
}