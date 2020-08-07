let initialState = {
    wishlist: [],
    bag: [],
    orders: [],
    onWishlist: 0,
    onBag: 0
}

const reducer = (state=initialState, action)=> {
    let stateCopy = {...state};
    switch (action.type) {
        case 'ADD_WISHLIST':
            if (!Array.isArray(action.payload)) {
                stateCopy.wishlist = [...stateCopy.wishlist, action.payload]
                stateCopy.onWishlist++
            } else {    
                stateCopy.wishlist = [...stateCopy.wishlist, ...action.payload]
            }
            console.log(stateCopy)
            return stateCopy;
        case 'ADD_BAG':
            if (!Array.isArray(action.payload)) {
                let check = stateCopy.bag.find(elm => 
                    elm.prod.prodCode === action.payload.prod.prodCode && action.payload.size===elm.size && action.payload.color===elm.color)
                if (check === undefined) {
                    stateCopy.bag = [...stateCopy.bag,{...action.payload, quantity:1}]
                    stateCopy.onBag++
                } else {
                    let temp = stateCopy.bag.map(product =>  {
                        if (product.prod.prodCode===action.payload.prod.prodCode && action.payload.size===product.size && action.payload.color===product.color){
                            return {...product,quantity:product.quantity+1}
                        }
                        else return product
                    })
                    stateCopy.bag = temp;
                    stateCopy.onBag++
                }
            } else {    
                stateCopy.bag = [...stateCopy.bag, ...action.payload]
            }
            console.log(stateCopy)
            return stateCopy;
        case 'REMOVE_WISHLIST':
            let elem = stateCopy.wishlist.find(elm => elm.prodCode===action.payload)
            let i = stateCopy.wishlist.indexOf(elem)
            let tem = [...stateCopy.wishlist]
            tem.splice(i,1)
            stateCopy.wishlist = tem
            return stateCopy;
        case 'REMOVE_BAG':
            let {prod, size, color} = action.payload
            let ele = stateCopy.bag.find(elm => elm.prod.prodCode === prod.prodCode && elm.size === size && elm.color === color)
            console.log(ele,'ele')
            let j = stateCopy.bag.indexOf(ele)
            let temp = [...stateCopy.bag]
            temp.splice(j,1)
            console.log(temp,'temp')
            stateCopy.bag = temp
            console.log(stateCopy.bag,'bag')
            return stateCopy;
        case 'DECREMENT_BAG':
            let tempdec = stateCopy.bag.map(product =>  {
                if (product.prod.prodCode===action.payload.prod.prodCode && action.payload.size===product.size && action.payload.color===product.color){
                    return {...product,quantity:product.quantity-1}
                }
                else return product
            })
            stateCopy.bag = tempdec;
            stateCopy.onBag--
            return stateCopy;
        case 'SET_ORDERS':
            if (Array.isArray(action.payload)) {
                stateCopy.orders = [...stateCopy.orders, ...action.payload]
            } else {
                stateCopy.orders = [...stateCopy.orders, action.payload]
            }
            return stateCopy;
        case 'CLEAR_WISHLIST_BAG':
            stateCopy.wishlist = []
            stateCopy.bag = []
            return stateCopy;
        case 'CLEAR_BAG':
            stateCopy.bag = []
            return stateCopy;
        default:
            return stateCopy;
    }
}

export default reducer;