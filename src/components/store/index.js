import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistMiddleware } from 'redux-persist';

const persistConfig = {
    key: 'cart/location',
    storage: storage,
}

const locationSlice = createSlice({
    name: 'location',
    initialState: {},
    reducers: {
        setLocation(state,action) {
            return {...state, location: action.payload}
        }
    }
})

const productCartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addProduct(state, action) {
            return [...state, action.payload]
        },
        removeProduct(state, action) {

        },
        addProdByOne(state, action) {
            let cartIndex = state.findIndex(
                (item, i) => i === action.payload.id,
            )
            if (action.payload.productQty <= 0) {
                state.splice(cartIndex, 1);
                return
            }
            state[cartIndex].productQuantity = action.payload.productQty;
        }
    }
});

const rootReducers = combineReducers({
    cart: productCartSlice.reducer,
    location : locationSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
    reducer: persistedReducer,
    preloadedState: { cart: [], location:{} }
});
const persistor = persistStore(store)
const { location } = store.getState();
console.log(location);


export const { addProduct, removeProduct, addProdByOne } = productCartSlice.actions;
export  const {setLocation} = locationSlice.actions;
export { store, persistor };