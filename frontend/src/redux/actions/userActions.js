import axios from 'axios';
axios.defaults.withCredentials = true;
const action = {}

action.addGuestWishlist = (prod) => {
    let wishArr = localStorage.getItem('wishlist') || [];
    if (wishArr.length) wishArr = JSON.parse(wishArr)
    wishArr.push(prod.prodCode)
    localStorage.setItem('wishlist', JSON.stringify(wishArr));
    return (dispatch) => dispatch({ type: 'ADD_WISHLIST', payload: prod })
}

action.loadWishlist = () => {
    return (dispatch) => {
        let wishlist = localStorage.getItem('wishlist');
        if (wishlist !== null) {
            axios.get(`${process.env.REACT_APP_API_URI}/getProductBulk/${wishlist}`)
                .then((doc) => {
                    dispatch({ type: 'ADD_WISHLIST', payload: doc.data })
                })
                .catch((err) => {
                    dispatch({ type: 'FETCH_ERROR' })
                })
        }
    }
}

action.removeGuestWishlist = (prodCode) => {
    let wishArr = JSON.parse(localStorage.getItem('wishlist'));
    let elem = wishArr.find(elm => elm === prodCode);
    let i = wishArr.indexOf(elem)
    wishArr.splice(i, 1)
    localStorage.setItem('wishlist', JSON.stringify(wishArr));
    return (dispatch) => dispatch({ type: 'REMOVE_WISHLIST', payload: prodCode })
}

action.addGuestBag = (bagProd) => {
    let bag = localStorage.getItem('bag') || []
    if (bag.length) bag = JSON.parse(bag)
    let check = bag.find(elm => elm.prod === bagProd.prod.prodCode && elm.size===bagProd.size && elm.color===bagProd.color)
    if (check === undefined) {
        bag.push({ prod: bagProd.prod.prodCode, size: bagProd.size, color: bagProd.color, price: bagProd.price, quantity: 1 })
    } else {
        bag = bag.map(product => {
            if (product.prod === bagProd.prod.prodCode && product.size===bagProd.size && product.color===bagProd.color) return { ...product, quantity: product.quantity + 1 }
            else return product
        })
    }
    localStorage.setItem('bag', JSON.stringify(bag));
    return (dispatch) => dispatch({ type: 'ADD_BAG', payload: bagProd })
}

action.loadBag = () => {
    return (dispatch) => {
        let bag = localStorage.getItem('bag');
        if (bag !== null) {
            bag = JSON.parse(bag)
            let { size, color, quantity} = bag
            let bagList = bag.map(elm => elm.prod)
            bagList = JSON.stringify(bagList)
            axios.get(`${process.env.REACT_APP_API_URI}/getProductBulk/${bagList}`)
                .then((doc) => {
                    let temp = bag.map(elm => {
                        let docMatch = doc.data.find(elem => elem.prodCode === elm.prod)
                        return {...elm,prod: docMatch}
                    })
                    dispatch({ type: 'ADD_BAG', payload: temp })
                })
                .catch((err) => {
                    dispatch({ type: 'FETCH_ERROR' })
                })
        }
    }
}

action.removeGuestBag = (bagProd) => {
    let { prod, size, color } = bagProd
    let bagArr = JSON.parse(localStorage.getItem('bag'));
    let elem = bagArr.find(elm => elm.prod === prod.prodCode && elm.size === size && elm.color === color);
    let i = bagArr.indexOf(elem)
    bagArr.splice(i, 1)
    localStorage.setItem('bag', JSON.stringify(bagArr));
    return (dispatch) => dispatch({ type: 'REMOVE_BAG', payload: bagProd })
}

export const { addGuestWishlist, removeGuestWishlist, addGuestBag, loadWishlist, removeGuestBag, loadBag } = action;