import { useSelector, useDispatch } from 'react-redux';
import { addProdByOne } from '../src/components/store';

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    console.log(cart)
    const handleClick = (productQty, id) => {
        dispatch(addProdByOne({id,productQty}))
    }
    return (
        <>
            <div className='cart_container'>
                <div style={{ width: '70%' }}>
                    {
                        cart.map((p, i) => {
                            return (
                                <div key={i} className='imageContainer'>
                                    <img src={p.productImage.src} alt='product_image' width={"200px"} />
                                    <div>
                                        <p>{p.productName}</p>
                                        <p>{p.productPrice}</p>
                                    </div>
                                    <div className="cart_button">
                                        <button onClick={()=>handleClick(p.productQuantity-1, i)}>-</button>
                                        <span>{p.productQuantity}</span>
                                        <button onClick={()=>handleClick(p.productQuantity+1, i)}>+</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='cart_total_container'>
                    <h2>Summary</h2>
                </div>
            </div>
        </>
    )
}

export default Cart;