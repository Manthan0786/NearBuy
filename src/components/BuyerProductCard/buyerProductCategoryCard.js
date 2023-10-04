import { Link } from '@mui/material';
import Image from 'next/image';
import styles from '../BuyerProductCard/buyerproductcard.module.css';
import GetLocation from '../location';


function Buyerproductcategorycard(props) {
    return (
        <>
            <div className='product_productname'>
                <Link href={`../buyer/product/${props.name}`} >
                    <Image
                        src={props.image[0]}
                        alt={props.name}
                        className={styles.product_image}
                        width={300}
                        height={250}
                    />
                </Link>
                <p className='styles.product_name'>{props.name}</p>
            </div>
        </>
    )
}



export default Buyerproductcategorycard;