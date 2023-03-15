import { Link } from '@mui/material';
import Image from 'next/image';
import styles from '../BuyerProductCard/buyerproductcard.module.css';

function ProductsCard(props) {
    return (
        <>
            <div className='product_productname'>
                <Link href='../../buyer/product/productDescription'>

                    <Image
                        src={props.image}
                        alt="Picture of the Product"
                        width={400}
                        height={300}
                        className={styles.product_image}
                    />

                </Link>
                <div className={styles.product_name_price}>
                    <p className={styles.product_name}>{props.name}</p>
                    <p className={styles.product_name}>{props.location}</p>
                </div>
            </div>
        </>
    )
}

export default ProductsCard;