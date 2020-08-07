import React, { Component } from 'react';
import styles from './ProductCard.module.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addGuestWishlist, removeGuestWishlist } from './../../../../redux/actions/userActions';
import { addToWishlist, removeFromWishlist} from './../../../../redux/actions/authUserActions';

class ProductCard extends Component {
    heartRef = React.createRef()
    state = {
        redirect: false,
        inWish: false,
    }
    componentDidUpdate(prevsProps,prevsState) {
        if (prevsProps.wishlist !== this.props.wishlist) {
            let inWish = this.props.wishlist.find(elm => elm.prodCode===this.props.prod.prodCode);
            if (inWish===undefined){
                this.setState({inWish:false});
                return
            }
            this.setState({inWish:true});
        }
    }
    componentDidMount() {
        let inWish = this.props.wishlist.find(elm => elm.prodCode===this.props.prod.prodCode);
        if (inWish===undefined){
            console.log('false')
            this.setState({inWish:false});
            return
        }
        console.log('true')
        this.setState({inWish:true});
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
    checkInWishlist() {
        return !(this.state.inWish) ? styles['heart__outline'] : styles['heart__fill'];
    }
    updateWishlist() {
        console.log(this.props.isAuthenticated, 'in click')
        if (this.state.inWish) {
            this.props.isAuthenticated ? this.props.removeFromWishlist(this.props.prod.prodCode):
            this.props.removeGuestWishlist(this.props.prod.prodCode)
            return
        }
        //this.heartRef.current.classList.add(styles['animate'])
        setTimeout(()=> this.heartRef.current.classList.add(styles['animate']), 400);
        this.props.isAuthenticated ? this.props.addToWishlist(this.props.prod) :
        this.props.addGuestWishlist(this.props.prod)
    }
    render() {
        let {images,name} = this.props.prod
        return (
            <div className={styles['productCard__container']}>
                {this.renderRedirect()}
                <div ref={this.heartRef} className={`${styles['icons']} ${this.checkInWishlist()}`} onClick={(e) => this.updateWishlist(e)}>
                </div>
                <img src={images.img1} alt={name} onClick={()=>this.setRedirect()}/>
                <small>{`${this.getColorsNo()} COLORS`}</small>
                <h4>{name}</h4>
            </div>
        )
    }
}

const mapStateToProps = (reducState) => {
    let state = {...reducState.userReducer, ...reducState.signReducer}
    return ({
        isAuthenticated: state.isAuthenticated,
        wishlist: state.wishlist
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        addGuestWishlist: (prod) => dispatch(addGuestWishlist(prod)),
        removeGuestWishlist: (prodCode) => dispatch(removeGuestWishlist(prodCode)),
        addToWishlist: (prod) => dispatch(addToWishlist(prod)),
        removeFromWishlist: (prodCode) => dispatch(removeFromWishlist(prodCode))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductCard);