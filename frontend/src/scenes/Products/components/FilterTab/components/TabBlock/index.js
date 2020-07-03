import React, { Component } from 'react';
import styles from './TabBlock.module.scss';
import { connect } from 'react-redux';
import { filterProducts, setIsProducts, setSelectedFilters } from './../../../../../../redux/actions/productsActions';

class TabBlock extends Component {
    filter(e) {
        let filterName = this.props.filterName
        let temp = {}
        temp[filterName] = `${this.props.selectedFilters[filterName]},${e.target.textContent}`
        this.props.setSelectedFilters(temp)
        setTimeout(() => {
            this.props.filterProducts(this.props.path, this.props.selectedFilters)
            this.props.setIsProducts();
        }, 0)
    }

    render() {
        let filterName = this.props.filterName
        let selectedFilters = this.props.selectedFilters[filterName].split(',')
        return (
            <section style={{ width: this.props.style.width, left: this.props.style.left }} 
            className={styles['tabBlock']} >
                <section>
                    {this.props.tabItems.map((item, index) => {
                        return selectedFilters.includes((item).toString()) ?
                            <div key={index} className={styles['selected']} style={{ width: this.props.style.itemWidth }}>{item}</div> :
                            <div key={index} style={{ width: this.props.style.itemWidth }}
                                onClick={(e) => this.filter(e)}>{item}</div>
                    })}
                </section>
            </section>
        )
    }
}

const mapStateToProps = (reducState) => {
    let state = reducState.productsReducer;
    return {
        selectedFilters: state.selectedFilters
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterProducts: (path, data) => dispatch(filterProducts(path, data)),
        setIsProducts: () => dispatch(setIsProducts()),
        setSelectedFilters: (data) => dispatch(setSelectedFilters(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabBlock);