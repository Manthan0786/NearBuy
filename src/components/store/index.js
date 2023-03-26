import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistMiddleware } from 'redux-persist';

const persistConfig = {
    key: 'cart',
    storage: storage,
}

const productCartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
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
            state[cartIndex].productQuantity = action.payload.productQty;
        }
    }
});

const rootReducers = combineReducers({
    cart: productCartSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
    reducer: persistedReducer,
    preloadedState: { cart: [] }
});
const persistor = persistStore(store)


export const { addProduct, removeProduct, addProdByOne } = productCartSlice.actions;
export { store, persistor };