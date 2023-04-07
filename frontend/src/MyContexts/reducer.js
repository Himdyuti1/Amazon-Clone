export const initialState={
    basket:[],
    user:null,
    name:''
};

export const getBasketTotal=(basket)=>{
    let amount=0;
    for(var i=0;i<basket?.length;i++) amount+=basket[i].price;
    return amount;
}

export const Rupee=(value)=>{
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    });
    let valueString=formatter.format(value);
    valueString=valueString.substring(1);
    return valueString;
}

const reducer=(state,action)=>{
    switch(action.type){
        case 'ADD_TO_BASKET':
            return{
                ...state,
                basket:[...state.basket,action.item]
            };
        case 'REMOVE_FROM_BASKET':
            const basket=state.basket;
            var index=0;
            for(;index<basket?.length;index++){
                if(basket[index].id===action.id){
                    break;
                }
            }
            let newBasket=[...state.basket];
            newBasket.splice(index,1);
            return{
                ...state,
                basket:newBasket
            }
        case 'SET_USER':
            return{
                ...state,
                user:action.user,
                name:action.name,
                basket:action.basket
            }
        case 'EMPTY_BASKET':
            return{
                ...state,
                basket:[]
            }
        default:
            return state
    }
}

export default reducer;