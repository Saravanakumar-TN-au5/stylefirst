import React, { Component } from 'react';
import Button from '../../components/Button';
import PageLoader from './../../components/PageLoader';
import Carousel from './components/Carousel';
import axios from 'axios';
import styles from './ProductDetail.module.scss';
import { connect } from 'react-redux';
import { addGuestBag } from './../../redux/actions/userActions';
import { addToBag } from './../../redux/actions/authUserActions';

class ProductDetail extends Component {
    state = {
        color: null,
        size: 'Size',
        price: null,
        product: null,
        detailNav: 'desc',
        colors: [],
        sizes: [],
        tabBlock: null
    }

    componentDidMount() {
        let id = this.props.match.params.prodcode;
        axios.get(`${process.env.REACT_APP_API_URI}/getProduct/${id}`)
            .then((response) => {
                let res = response.data[0];
                let color = res.variants[0].color;
                let temp = [], colors = [], sizes = [];
                for (const variant of res.variants) {
                    !colors.includes(variant.color) ? colors.push(variant.color) : temp.push(variant.color);
                    (variant.color===color && !sizes.includes(variant.size)) ? sizes.push(variant.size) : temp.push(variant.size)
                }
                sizes.sort((a, b) => a - b)
                this.setState({
                    product: res,
                    price: res.variants[0].varId.price,
                    color: res.variants[0].color,
                    colors: colors,
                    sizes: sizes
                });
            })
    }

    componentDidUpdate(prevsProps,prevsState) {
        if (this.state.size!=='Size' && (prevsState.size !== this.state.size)){
            let variant = this.state.product.variants.find(elm => 
                elm.size===this.state.size && elm.color===this.state.color)
            this.setState({price: variant.varId.price});
        }
    }

    colorChange(color) {
        let sizes = [];
        for (const variant of this.state.product.variants) {
            if (variant.color===color) sizes.push(variant.size)
        }
        this.setState({sizes,color,size:'Size'});
    }

    onDropdown(e) {
        if (this.state.tabBlock === e.target.parentElement.getAttribute('id')){
            e.target.classList.remove(styles['arrow--up'])
            e.target.classList.add(styles['arrow--down'])
            this.setState({tabBlock: null})
            return
        }
        e.target.classList.remove(styles['arrow--down'])
        e.target.classList.add(styles['arrow--up'])
        this.setState({tabBlock: e.target.parentElement.getAttribute('id')})
    }
    addToGuestBag() {
        let bagProd = {
            prod:this.state.product, 
            size:this.state.size,
            color:this.state.color,
            price: this.state.price
        }
        this.props.isAuthenticated ? this.props.addToBag(bagProd) :
        this.props.addGuestBag(bagProd)
    }
    render() {
        return (
            this.state.product ?
                <section className={styles['container']} style={{ position: 'relative', top: '80px' }}>
                    <section className={styles['product__detail']}>
                        <h1>{this.state.product.name}</h1>
                        <p>{this.state.product.description}</p>
                        <div className={styles['price']}>{this.state.price + '.00 $'}</div>
                        <ul>
                            <li id='col'>
                                <span className={styles['arrow--down']}
                                onClick={(e)=>this.onDropdown(e)}>{this.state.color}</span>
                                {this.state.tabBlock==='col' ?
                                <ul className={styles['tab']}>
                                {this.state.colors.map((color,index) => {
                                    return <li key={index} className={styles['tab__elem']}
                                    className={this.state.color===color? styles['selected']:null}
                                    onClick={() => this.colorChange(color)}>{color}</li>
                                })}
                                </ul>: null
                                }
                            </li>
                            <li id='siz'>
                                <span className={styles['arrow--down']}
                                onClick={(e)=>this.onDropdown(e)}>{this.state.size}</span>
                                {this.state.tabBlock==='siz' ?
                                <ul className={styles['tab']}>
                                {this.state.sizes.map((size,index) => {
                                    return <li key={index} className={styles['tab__elem']}
                                    onClick={() => this.setState({size: size})}
                                    className={this.state.size===size? styles['selected']:null}>{size}</li>
                                })}
                                </ul>:null
                                }
                            </li>
                        </ul>
                        <div className={styles['selsize']}>
                            <small>{this.state.size==='Size'?'*Select size':null}</small>
                        </div>    
                        <div className={styles['addToBag']}>
                            <Button type='button' color='btn--dark' name='Add to bag' isDisabled={this.state.size==='Size'?true:false}
                            event={() => this.addToGuestBag()}/>
                        </div>
                        <section className={styles['details']}>
                            <ul>
                                <li onClick={() => this.setState({ detailNav: 'desc' })}
                                    className={this.state.detailNav === 'desc' ? styles['bold'] : null}>Description</li>
                                <li onClick={() => this.setState({ detailNav: 'comp' })}
                                    className={this.state.detailNav === 'comp' ? styles['bold'] : null}>Composition</li>
                            </ul>
                            {this.state.detailNav === 'desc' ?
                                <div className={styles['detail__block']}>
                                    <div>Product code: <span className={styles['bold']}>{this.state.product.prodCode}</span></div>
                                    <ul>
                                        {this.state.product.shortDesc.split(',').map((item, index) => {
                                            return <li key={index}>{item}</li>
                                        })}
                                    </ul>
                                </div> :
                                <div className={styles['detail__block']}>{this.state.product.material}</div>}
                        </section>
                    </section>
                    <div className={styles['carousel']}>
                        <Carousel images={this.state.product.images} />
                    </div>
                </section> : <PageLoader />
        )
    }
}

const mapStateToProps = (reducState) => {
    let state = {...reducState.headerReducer, ...reducState.signReducer}
    return {
        topDrawerVisibe: state.topDrawerVisible,
        isAuthenticated: state.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addGuestBag: (prod) => dispatch(addGuestBag(prod)),
        addToBag: (prod) => dispatch(addToBag(prod))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);