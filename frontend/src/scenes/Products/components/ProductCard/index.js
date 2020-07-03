import React, { Component } from 'react';
import styles from './ProductCard.module.scss';
import { Redirect } from 'react-router-dom';

class ProductCard extends Component {
    state = {
        redirect: false
    }
    getColorsNo() {
        let colors = []
        this.props.prod.variants.forEach(elem => {
            return !colors.includes(elem.color) ? colors.push(elem.color) : null
        });
        return colors.length
    }
    setRedirect() {
        this.setState({redirect: true})
    }
    renderRedirect() {
        let {_id,path,prodCode,category} = this.props.prod
        return this.state.redirect? <Redirect to={{
            pathname: `/product${path}/${category.toLowerCase()}/${prodCode}`,
            state: {id: _id}
        }}/>:null;
    }
    render() {
        let {images,name} = this.props.prod
        return (
            <div className={styles['productCard__container']}>
                {this.renderRedirect()}
                <img src={images.img1} alt={name} onClick={()=>this.setRedirect()}/>
                <small>{`${this.getColorsNo()} COLORS`}</small>
                <h4>{name}</h4>
            </div>
        )
    }
}

export default ProductCard;