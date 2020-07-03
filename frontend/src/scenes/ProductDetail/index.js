import React, { Component } from 'react';
import Button from '../../components/Button';
import PageLoader from './../../components/PageLoader';
import Carousel from './components/Carousel';
import axios from 'axios';
import styles from './ProductDetail.module.scss';

class ProductDetail extends Component {
    state = {
        color: null,
        size: null,
        price: null,
        product: null,
        detailNav: 'desc'
    }

    componentDidMount() {
        let id = this.props.location.state.id;
        axios.get(`${process.env.REACT_APP_API_URI}/getProduct/${id}`)
        .then((response) => {
            let res = response.data[0];
            this.setState({
                product: res,
                price: res.variants[0].varId.price,
                color: res.variants[0].color
            });
        })
    }

    render() {
        return (
            this.state.product ?
            <section className={styles['container']} style={{position:'relative',top:'80px'}}>
                <section className={styles['product__detail']}>
                    <h1>{this.state.product.name}</h1>
                    <p>{this.state.product.description}</p>
                    <div className={styles['price']}>{this.state.price+'.00 $'}</div>
                    <ul>
                        <li>{this.state.color}</li>
                        <li>Size</li>
                    </ul>
                    <div className={styles['addToBag']}>
                        <Button type='button' color='btn--dark' name='Add to bag' />
                    </div>
                    <section className={styles['details']}>
                        <ul>
                            <li onClick={() => this.setState({detailNav:'desc'})}
                            className={this.state.detailNav === 'desc' ? styles['bold']:null}>Description</li>
                            <li onClick={() => this.setState({detailNav:'comp'})}
                            className={this.state.detailNav === 'comp' ? styles['bold']:null}>Composition</li>
                        </ul>
                        {this.state.detailNav === 'desc' ?
                        <div className={styles['detail__block']}>
                            <div>Product code: <span className={styles['bold']}>{this.state.product.prodCode}</span></div>
                            <ul>
                                {this.state.product.shortDesc.split(',').map((item, index) => {
                                    return <li key={index}>{item}</li>
                                })}
                            </ul>
                        </div>:
                        <div className={styles['detail__block']}>{this.state.product.material}</div>}
                    </section>
                </section>
                <div className={styles['carousel']}>
                    <Carousel images={this.state.product.images}/>
                </div>
            </section> : <PageLoader/>
        )
    }
}

export default ProductDetail;