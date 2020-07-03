import React, { Component } from 'react';
import styles from './WomenShoes.module.scss';
import FilterTab from '../components/FilterTab';
import PageLoader from '../../../components/PageLoader';
import ProductCard from '../components/ProductCard';
import { connect } from 'react-redux';
import { getProducts, getFilters} from '../../../redux/actions/productsActions';
import ServerDown from '../../../components/ServerDown';

class ProductsDisplay extends Component {
    componentDidMount() {
        this.props.getProducts(`/${this.props.match.params.for}/${this.props.match.params.type}`)
        this.props.getFilters(`/${this.props.match.params.for}/${this.props.match.params.type}`)
    }

    render() {
        return (
            <section className={styles['container']} style={{position:'relative',top:'80px'}}>
                {!this.props.fetchError ?
                <>
                <FilterTab filters={{...this.props.filters}} path={`/${this.props.match.params.for}/${this.props.match.params.type}`}/>
                {this.props.isFilters && this.props.isProducts ?
                    <>
                    <section className={styles['prodsContainer']}>
                        {this.props.products.map((product,index) => {
                            return <ProductCard key={index}
                            prod={product}/>
                        })}
                    </section> 
                    </>:
                    <PageLoader/>}</> : <ServerDown message='Server Down. Please check back later'/>}
            </section>
        )
    }
}

const mapStateToProps = (reducState) => {
    let state = reducState.productsReducer;
    return {
        products: state.products,
        filters: state.filters,
        isProducts: state.isProducts,
        isFilters: state.isFilters,
        fetchError: state.fetchError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts : (data) => dispatch(getProducts(data)),
        getFilters : (data) => dispatch(getFilters(data))
    }
}

export default (connect(mapStateToProps,mapDispatchToProps)(ProductsDisplay));