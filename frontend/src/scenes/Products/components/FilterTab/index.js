import React, { Component } from 'react';
import styles from './FilterTab.module.scss';
import TabBlock from './components/TabBlock';
import Button from './../../../../components/Button';
import { connect } from 'react-redux';
import { 
    setSelectedFilters, 
    filterProducts, 
    setIsProducts,
    setIsFilterSelected } from './../../../../redux/actions/productsActions';

class FilterTab extends Component {
    state = {
        currentTab: '',
        tabBlock: ''
    }

    clearFilters() {
        let temp = {category:'',size:'',material:'',color:''}
        this.props.setSelectedFilters(temp)
        this.props.setIsFilterSelected()
        setTimeout(() => {
            console.log(this.props.selectedFilters)
            this.props.filterProducts(this.props.path, this.selectedFilters)
            this.props.setIsProducts();
        }, 0)
    }

    componentDidUpdate(prevsProps, prevsState) {
        if (prevsState.currentTab !== this.state.currentTab) {
            switch (this.state.currentTab) {
                case 'category':
                    let cat = <TabBlock style={{width:'20%',itemWidth:'100%',left:'0'}} filterName={'category'}
                    tabItems={this.props.filters.category} path={this.props.path}/>
                    this.setState({ tabBlock: cat })
                    break;
                case 'size':
                    let siz = <TabBlock style={{width:'40%',itemWidth:'20%',left:'160px'}} filterName={'size'}
                    tabItems={this.props.filters.size} path={this.props.path}/>
                    this.setState({ tabBlock: siz })
                    break;
                case 'material':
                    let mat = <TabBlock style={{width:'20%',itemWidth:'100%',left:'296px'}} filterName={'material'}
                    tabItems={this.props.filters.material} path={this.props.path}/>
                    this.setState({ tabBlock: mat })
                    break;
                case 'color':
                    let col = <TabBlock style={{width:'40%',itemWidth:'28%',left:'462px'}} filterName={'color'}
                    tabItems={this.props.filters.color} path={this.props.path}/>
                    this.setState({ tabBlock: col })
                    break;
                default:
                    this.setState({tabBlock: ''})
                    break;
            }
        }
    }

    setTab(e) {
        if (e.target.parentElement.getAttribute('id') === this.state.currentTab){
            this.setState({ currentTab: '' })
            e.target.classList.remove(styles['arrowUp'])
            e.target.classList.add(styles['arrowDown'])
            return
        }
        this.setState({ currentTab: e.target.textContent.split(' ')[0] })
        e.target.classList.remove(styles['arrowDown'])
        e.target.classList.add(styles['arrowUp'])
    }

    calcuateCount(type) {
        return this.props.selectedFilters[type]==='' ?
        '' : <span className={styles['f-count']}>({this.props.selectedFilters[type].split(',').length-1})</span>;
    }

    render() {
        return (
            <section className={styles['container']}>
                <section className={styles['nav__tab']}>
                    <ul>
                        <li>
                            <div id='category' onClick={(e) => { this.setTab(e) }}>
                                <span className={styles['arrowDown']}>category {this.calcuateCount('category')}</span>
                            </div>
                        </li>
                        <li>
                            <div id='size' onClick={(e) => { this.setTab(e) }}>
                                <span className={styles['arrowDown']}>size {this.calcuateCount('size')}</span>
                            </div>
                        </li>
                        <li>
                            <div id='material' onClick={(e) => { this.setTab(e) }}>
                                <span className={styles['arrowDown']}>material {this.calcuateCount('material')}</span>
                            </div>
                        </li>
                        <li>
                            <div id='color' onClick={(e) => { this.setTab(e) }}>
                                <span className={styles['arrowDown']}>color {this.calcuateCount('color')}</span>
                            </div>
                        </li>
                    </ul>
                    {this.props.isFilterSelected ?
                    <div className={styles['clearBtn']}>
                        <Button type='button' name='Clear all' color='btn--dark' event={this.clearFilters.bind(this)}/>
                    </div>:null
                    }
                </section>
                {this.state.tabBlock ? this.state.tabBlock : ''}
            </section>
        )
    }
}

const mapStateToProps = (reducState) => {
    let state = reducState.productsReducer;
    return {
        isFilterSelected: state.isFilterSelected,
        selectedFilters: state.selectedFilters
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsProducts: () => dispatch(setIsProducts()),
        setSelectedFilters: (data) => dispatch(setSelectedFilters(data)),
        filterProducts: (path,data) => dispatch(filterProducts(path,data)),
        setIsFilterSelected: () => dispatch(setIsFilterSelected())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FilterTab);